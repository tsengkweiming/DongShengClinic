// ── Hero WebGL gradient — metaball physics ────────────────────────────────────
(function () {
  const canvas = document.getElementById('hero-canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return;

  const MAX = 12; // total blob slots (6 base + 6 burst)

  // ── Vertex shader ────────────────────────────────────────────────────────────
  const VS = `
    attribute vec2 a_pos;
    void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;

  // ── Fragment shader ──────────────────────────────────────────────────────────
  // Metaball field: f_i = r_i^2 / d_i^2  (classic potential field)
  // Blobs merge when sum(f_i) > threshold (1.0).
  // Colors are weighted by each blob's field contribution → smooth colour blend.
  const FS = `
    precision mediump float;
    uniform vec2  u_res;
    uniform vec2  u_bpos[${MAX}];
    uniform float u_brad[${MAX}];
    uniform vec3  u_bcol[${MAX}];
    uniform vec2  u_click;
    uniform float u_clickAge;

    void main() {
      vec2 uv = gl_FragCoord.xy / u_res;
      uv.y    = 1.0 - uv.y;
      float ar = u_res.x / u_res.y;

      vec3 base = vec3(0.980, 0.965, 0.933); // #FAF6EE

      // Accumulate metaball potential field and weighted colour
      float field  = 0.0;
      vec3  wCol   = vec3(0.0);

      for (int i = 0; i < ${MAX}; i++) {
        float r = u_brad[i];
        float active = step(0.001, r);        // 0 for inactive slots
        vec2  d = uv - u_bpos[i];
        d.x *= ar;                            // aspect-correct distance
        float f = active * (r * r) / max(dot(d, d), 0.0002);
        field += f;
        wCol  += f * u_bcol[i];
      }

      // Colour inside the blobs — weighted blend of contributors
      vec3 blobColor = wCol / max(field, 0.001);

      // Inner hotspot: brighter where blobs merge (field >> 1)
      float hot = smoothstep(1.8, 5.0, field);
      blobColor  = mix(blobColor,
                       clamp(blobColor * 1.5 + vec3(0.10, 0.03, 0.0), 0.0, 1.0),
                       hot * 0.45);

      // Soft outer halo: very subtle tint before the actual surface
      float halo = smoothstep(0.0, 0.55, field);
      base       = mix(base, blobColor, halo * 0.10);

      // Main surface blend — smooth transition at threshold 1.0
      float alpha = smoothstep(0.50, 1.05, field);
      vec3  col   = mix(base, blobColor, alpha * 0.93);

      // Screen-door dithering to prevent banding
      float noise = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.545);
      col += (noise - 0.5) * 0.0025;

      // Click ripple — expanding ring + flash at cursor
      float cAge = u_clickAge;
      float cActive = step(cAge, 2.0); // 1 while ripple lives
      if (cActive > 0.5) {
        float prog  = cAge / 2.0;
        vec2  rDiff = uv - u_click;
        rDiff.x    *= ar;
        float rDist = length(rDiff);
        float ringR = prog * 1.1;
        float ringW = 0.022 * (1.0 - prog);
        float ring  = smoothstep(ringW, 0.0, abs(rDist - ringR));
        float fade  = (1.0 - prog) * (1.0 - prog);
        col += vec3(0.839, 0.251, 0.0) * ring * fade * 0.45;
        // central flash
        float flash = smoothstep(0.18 * (1.0 - prog * prog), 0.0, rDist) * fade * 0.55;
        col += vec3(1.0, 0.55, 0.2) * flash;
      }

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;

  // ── Compile & link ────────────────────────────────────────────────────────────
  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
      console.error('[hero-gl]', gl.getShaderInfoLog(s));
    return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER,   VS));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  // Fullscreen quad
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1,-1,  1,-1,  -1,1,
    -1, 1,  1,-1,   1,1,
  ]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  // Uniform locations
  const uRes      = gl.getUniformLocation(prog, 'u_res');
  const uBpos     = [], uBrad = [], uBcol = [];
  for (let i = 0; i < MAX; i++) {
    uBpos.push(gl.getUniformLocation(prog, `u_bpos[${i}]`));
    uBrad.push(gl.getUniformLocation(prog, `u_brad[${i}]`));
    uBcol.push(gl.getUniformLocation(prog, `u_bcol[${i}]`));
  }
  const uClick    = gl.getUniformLocation(prog, 'u_click');
  const uClickAge = gl.getUniformLocation(prog, 'u_clickAge');

  // ── Blob colours (brand palette) ─────────────────────────────────────────────
  const COLORS = [
    [0.839, 0.251, 0.000], // #D64000 — primary red-orange
    [1.000, 0.333, 0.000], // #FF5500 — bright orange
    [0.545, 0.145, 0.000], // #8B2500 — deep red
    [0.980, 0.490, 0.200], // #FA7D33 — warm peach
    [0.760, 0.196, 0.031], // #C23208 — mid red
    [0.380, 0.059, 0.008], // #610F02 — dark brown-red
  ];

  // ── Base blob definitions ─────────────────────────────────────────────────────
  // depth drives size + speed: 1.0 = front (large, faster), 0.3 = back (small, slow)
  // baseX/Y = orbit centre, amp = orbit radius, speed = orbit Hz * 2π
  const base = [
    { baseX:0.78, baseY:0.62, r:0.26, col:COLORS[0], depth:1.0, amp:0.13, speed:0.18, phase:0.0 },
    { baseX:0.88, baseY:0.42, r:0.21, col:COLORS[1], depth:0.8, amp:0.17, speed:0.24, phase:1.2 },
    { baseX:0.66, baseY:0.80, r:0.19, col:COLORS[2], depth:0.6, amp:0.12, speed:0.32, phase:2.5 },
    { baseX:0.92, baseY:0.74, r:0.16, col:COLORS[4], depth:0.5, amp:0.10, speed:0.27, phase:3.7 },
    { baseX:0.60, baseY:0.52, r:0.14, col:COLORS[5], depth:0.4, amp:0.09, speed:0.38, phase:4.9 },
    { baseX:0.82, baseY:0.28, r:0.12, col:COLORS[3], depth:0.3, amp:0.08, speed:0.44, phase:1.8 },
  ];

  // Runtime state for base blobs
  const blobs = base.map(b => ({
    ...b, x: b.baseX, y: b.baseY, vx: 0, vy: 0,
  }));

  // Burst blob pool — slots 6-11, inactive (r=0) until a click fires them
  const burst = Array.from({ length: MAX - base.length }, () => ({
    x:0, y:0, vx:0, vy:0, r:0, col:[0,0,0], life:0,
  }));

  // ── State ─────────────────────────────────────────────────────────────────────
  let mouseX   = 0.78, mouseY  = 0.62;
  let hovering = false;
  let clickPos = [0.5, 0.5];
  let clickAt  = -9999;

  const REPEL_RADIUS = 0.32;
  const REPEL_K      = 0.00022;
  const SPRING_K     = 0.0028;
  const DAMPING      = 0.935;

  // ── Resize ────────────────────────────────────────────────────────────────────
  function resize() {
    canvas.width  = canvas.offsetWidth  * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();
  new ResizeObserver(resize).observe(canvas);

  // ── Input ─────────────────────────────────────────────────────────────────────
  const hero = canvas.parentElement;

  hero.addEventListener('mousemove', e => {
    const rc = hero.getBoundingClientRect();
    mouseX   = (e.clientX - rc.left) / rc.width;
    mouseY   = (e.clientY - rc.top)  / rc.height;
    hovering = true;
  });
  hero.addEventListener('mouseleave', () => { hovering = false; });

  hero.addEventListener('click', e => {
    const rc = hero.getBoundingClientRect();
    const cx = (e.clientX - rc.left) / rc.width;
    const cy = (e.clientY - rc.top)  / rc.height;
    clickPos = [cx, cy];
    clickAt  = performance.now();

    // Velocity kick on all base blobs — repel from click point
    for (const b of blobs) {
      const dx = b.x - cx, dy = b.y - cy;
      const dist = Math.sqrt(dx*dx + dy*dy) + 0.01;
      const impulse = 0.018 / dist;
      b.vx += dx / dist * impulse;
      b.vy += dy / dist * impulse;
    }

    // Spawn 2 burst blobs fanning out from cursor
    let spawned = 0;
    for (const s of burst) {
      if (s.r > 0.002) continue;
      const angle = Math.random() * Math.PI * 2;
      const spd   = 0.004 + Math.random() * 0.005;
      s.x    = cx + Math.cos(angle) * 0.03;
      s.y    = cy + Math.sin(angle) * 0.03;
      s.vx   = Math.cos(angle) * spd;
      s.vy   = Math.sin(angle) * spd;
      s.r    = 0.09 + Math.random() * 0.09;
      s.col  = COLORS[Math.floor(Math.random() * 3)]; // warm reds/oranges
      s.life = 1.0;
      if (++spawned >= 2) break;
    }
  });

  // ── Physics update ────────────────────────────────────────────────────────────
  let lastMs = 0;
  function update(ms) {
    const dt = Math.min((ms - lastMs) / 1000, 0.05);
    lastMs = ms;

    for (const b of blobs) {
      // Sinusoidal orbit target
      const tx = b.baseX + Math.sin(ms * 0.001 * b.speed + b.phase)          * b.amp;
      const ty = b.baseY + Math.cos(ms * 0.001 * b.speed * 0.71 + b.phase + 1.1) * b.amp * 0.8;

      // Spring toward orbit
      b.vx += (tx - b.x) * SPRING_K;
      b.vy += (ty - b.y) * SPRING_K;

      // Mouse repel
      if (hovering) {
        const dx   = b.x - mouseX, dy = b.y - mouseY;
        const dist = Math.sqrt(dx*dx + dy*dy) + 0.001;
        if (dist < REPEL_RADIUS) {
          const t = 1.0 - dist / REPEL_RADIUS;
          const f = REPEL_K * t * t * b.r * 6;
          b.vx += dx / dist * f;
          b.vy += dy / dist * f;
        }
      }

      b.vx *= DAMPING;
      b.vy *= DAMPING;
      b.x   = Math.max(0.02, Math.min(0.98, b.x + b.vx));
      b.y   = Math.max(0.02, Math.min(0.98, b.y + b.vy));
    }

    // Burst blobs: drift, shrink, die
    for (const s of burst) {
      if (s.r < 0.002) { s.r = 0; continue; }
      s.vx *= 0.968;
      s.vy *= 0.968;
      s.x  += s.vx;
      s.y  += s.vy;
      s.r  *= Math.pow(0.35, dt); // half-life ~0.7s
      s.x   = Math.max(0, Math.min(1, s.x));
      s.y   = Math.max(0, Math.min(1, s.y));
    }
  }

  // ── Render loop ───────────────────────────────────────────────────────────────
  function render(ms) {
    update(ms);

    gl.uniform2f(uRes, canvas.width, canvas.height);

    const all = [...blobs, ...burst];
    for (let i = 0; i < MAX; i++) {
      const b = all[i];
      gl.uniform2f(uBpos[i], b.x,       b.y);
      gl.uniform1f(uBrad[i], b.r);
      gl.uniform3f(uBcol[i], b.col[0], b.col[1], b.col[2]);
    }

    gl.uniform2f(uClick,    clickPos[0], clickPos[1]);
    gl.uniform1f(uClickAge, (ms - clickAt) / 1000);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
})();

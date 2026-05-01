// ── Hero WebGL gradient ──────────────────────────────────────────────────────
// Runs on page load (script is defer'd). Finds #hero-canvas and initialises a
// WebGL render loop. Falls back gracefully if WebGL is unavailable.

(function () {
  const canvas = document.getElementById('hero-canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return; // CSS fallback background on .hero-bg takes over

  // ── Vertex shader (fullscreen quad passthrough) ───────────────────────────
  const VS = `
    attribute vec2 a_pos;
    void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;

  // ── Fragment shader ───────────────────────────────────────────────────────
  // Edit this section to change the visual effect.
  //
  // Available uniforms:
  //   u_res        vec2  — canvas size in pixels
  //   u_time       float — elapsed seconds (increases forever)
  //   u_mouse      vec2  — normalised mouse position (0–1, origin top-left)
  //   u_mouseover  float — 1.0 when cursor is inside hero, 0.0 otherwise
  //
  // Helper: blob(uv, center, radius, stretch, aspect)
  //   Returns a smooth 0–1 weight for a soft elliptical gradient blob.
  //   center  — vec2 position in 0–1 UV space
  //   radius  — falloff distance (larger = bigger, softer blob)
  //   stretch — vec2 ellipse scale, e.g. vec2(1.0, 1.3) for a taller blob
  //   aspect  — pass the u_res.x/u_res.y ratio so circles look round
  const FS = `
    precision mediump float;

    uniform vec2  u_res;
    uniform float u_time;
    uniform vec2  u_mouse;
    uniform float u_mouseover;

    float blob(vec2 uv, vec2 center, float radius, vec2 stretch, float aspect) {
      vec2 d = (uv - center) * stretch;
      d.x *= aspect;
      return smoothstep(radius, 0.0, length(d));
    }

    void main() {
      vec2 uv  = gl_FragCoord.xy / u_res;
      uv.y     = 1.0 - uv.y;          // flip Y so (0,0) is top-left
      float ar = u_res.x / u_res.y;

      // Base cream colour #FAF6EE
      vec3 col = vec3(0.980, 0.965, 0.933);

      // Ambient orbit — primary blob position when no mouse interaction
      // Tweak the multipliers to change speed (0.22) and sweep width (0.09)
      float ax = 0.87 + 0.09 * sin(u_time * 0.22);
      float ay = 0.75 + 0.13 * cos(u_time * 0.17);
      vec2 primaryCenter = mix(vec2(ax, ay), u_mouse, u_mouseover);

      // Blob 1 — large primary, #D64000 warm red-orange
      float b1 = blob(uv, primaryCenter, 0.72, vec2(1.0, 1.25), ar);
      col = mix(col, vec3(0.839, 0.251, 0.000), b1 * 0.88);

      // Blob 2 — secondary, fixed position, bright #FF5500
      float b2 = blob(uv, vec2(0.85, 0.68), 0.52, vec2(0.9, 1.1), ar);
      col = mix(col, vec3(1.000, 0.333, 0.000), b2 * 0.55);

      // Blob 3 — accent, fixed position, deep #8B2500
      float b3 = blob(uv, vec2(0.70, 0.92), 0.38, vec2(1.2, 0.9), ar);
      col = mix(col, vec3(0.545, 0.145, 0.000), b3 * 0.45);

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  // ── Shader compilation ────────────────────────────────────────────────────
  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
      console.error('[hero-gl] Shader compile error:', gl.getShaderInfoLog(s));
    return s;
  }

  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER,   VS));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  // Fullscreen quad — two triangles that cover the entire clip space
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1,-1,  1,-1,  -1, 1,
    -1, 1,  1,-1,   1, 1,
  ]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  // Cache uniform locations
  const uRes       = gl.getUniformLocation(prog, 'u_res');
  const uTime      = gl.getUniformLocation(prog, 'u_time');
  const uMouse     = gl.getUniformLocation(prog, 'u_mouse');
  const uMouseover = gl.getUniformLocation(prog, 'u_mouseover');

  // ── State ─────────────────────────────────────────────────────────────────
  let mouseX    = 0.87, mouseY = 0.75;
  let mouseover = 0.0;
  const startTime = performance.now();

  // ── Resize — keeps canvas pixel-perfect on HiDPI screens ─────────────────
  function resize() {
    canvas.width  = canvas.offsetWidth  * devicePixelRatio;
    canvas.height = canvas.offsetHeight * devicePixelRatio;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();
  new ResizeObserver(resize).observe(canvas);

  // ── Mouse tracking ────────────────────────────────────────────────────────
  const hero = canvas.parentElement;
  hero.addEventListener('mousemove', (e) => {
    const r = hero.getBoundingClientRect();
    mouseX    = (e.clientX - r.left) / r.width;
    mouseY    = (e.clientY - r.top)  / r.height;
    mouseover = 1.0;
  });
  hero.addEventListener('mouseleave', () => { mouseover = 0.0; });

  // ── Render loop ───────────────────────────────────────────────────────────
  function render() {
    gl.uniform2f(uRes,       canvas.width, canvas.height);
    gl.uniform1f(uTime,      (performance.now() - startTime) / 1000);
    gl.uniform2f(uMouse,     mouseX, mouseY);
    gl.uniform1f(uMouseover, mouseover);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  }
  render();
})();

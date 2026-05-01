// ── Schedule calendar renderer ────────────────────────────────────────────────
// Reads window.SCHEDULE (set by schedule-data.js) and builds the weekly grid
// into #schedule-grid. No other dependencies.

(function () {
  const DAY_LABELS = ['週日','週一','週二','週三','週四','週五','週六'];
  const DAY_EN     = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const ORDER      = [1,2,3,4,5,6,0]; // Mon → Sun

  const todayDow = new Date().getDay();
  const grid     = document.getElementById('schedule-grid');
  if (!grid || !window.SCHEDULE) return;

  ORDER.forEach(dow => {
    const isToday  = dow === todayDow;
    const sessions = window.SCHEDULE[dow] || [];
    const isClosed = sessions.length === 0;

    const col = document.createElement('div');
    col.style.cssText = `
      background:${isToday ? '#1A1710' : '#FAF6EE'};
      display:flex; flex-direction:column;
    `;

    // Day header
    const header = document.createElement('div');
    header.style.cssText = `
      padding:.75rem 1rem;
      border-bottom:2px solid ${isToday ? '#D64000' : 'rgba(26,23,16,.08)'};
      display:flex; flex-direction:column; gap:.15rem;
    `;
    header.innerHTML = `
      <span style="font-family:'Inter',sans-serif;font-size:.58rem;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:${isToday ? '#D64000' : '#C4BFB5'};">${DAY_EN[dow]}</span>
      <span style="font-family:'Noto Serif TC',serif;font-weight:700;font-size:1rem;color:${isToday ? '#FAF6EE' : '#1A1710'};">${DAY_LABELS[dow]}</span>
      ${isToday ? '<span style="font-family:\'Inter\',sans-serif;font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;color:#D64000;margin-top:.1rem;">今日</span>' : ''}
    `;
    col.appendChild(header);

    // Session cards (or 休診)
    const body = document.createElement('div');
    body.style.cssText = 'padding:.75rem; display:flex; flex-direction:column; gap:.5rem; flex:1;';

    if (isClosed) {
      body.innerHTML = `
        <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:2rem 0;">
          <span style="font-family:'Noto Serif TC',serif;font-size:.85rem;color:${isToday ? 'rgba(250,246,238,.3)' : '#C4BFB5'};letter-spacing:.1em;">休　診</span>
        </div>
      `;
    } else {
      sessions.forEach(s => {
        const card = document.createElement('div');
        card.style.cssText = `
          padding:.65rem .75rem;
          background:${isToday ? 'rgba(250,246,238,.07)' : 'rgba(26,23,16,.04)'};
          border-left:2px solid ${isToday ? '#D64000' : '#1A1710'};
          display:flex; flex-direction:column; gap:.25rem;
        `;
        card.innerHTML = `
          <span style="font-family:'Noto Serif TC',serif;font-weight:700;font-size:.9rem;color:${isToday ? '#FAF6EE' : '#1A1710'};">${s.name}</span>
          <span style="font-family:'Inter',sans-serif;font-size:.68rem;color:${isToday ? 'rgba(250,246,238,.5)' : '#7A7568'};letter-spacing:.04em;">${s.time}</span>
          <span style="font-family:'Noto Sans TC',sans-serif;font-size:.72rem;color:${isToday ? 'rgba(250,246,238,.7)' : '#1A1710'};margin-top:.1rem;">${s.doctor}</span>
        `;
        body.appendChild(card);
      });
    }

    col.appendChild(body);
    grid.appendChild(col);
  });
})();

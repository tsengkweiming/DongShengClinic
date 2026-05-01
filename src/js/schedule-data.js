// ── Clinic schedule ───────────────────────────────────────────────────────────
// Edit this file to update hours or doctors. Keys: 0=Sun … 6=Sat.
// Empty array = 休診 that day.
// Each session: { name, time, doctor }
//   name   — '早診' | '午診' | '夜診'
//   time   — display string, e.g. '08:30 – 12:00'
//   doctor — doctor name(s) shown on the card

window.SCHEDULE = {
  0: [], // 週日 休診
  1: [
    { name:'早診', time:'08:30 – 12:00', doctor:'曾冬勝 醫師' },
    { name:'午診', time:'14:30 – 18:00', doctor:'吳焜棋 醫師' },
    { name:'夜診', time:'18:30 – 21:00', doctor:'曾冬勝 醫師' },
  ],
  2: [
    { name:'早診', time:'08:30 – 12:00', doctor:'曾冬勝・陳鑫儀 醫師' },
    { name:'午診', time:'14:30 – 18:00', doctor:'吳焜棋 醫師' },
  ],
  3: [
    { name:'早診', time:'08:30 – 12:00', doctor:'曾冬勝 醫師' },
    { name:'午診', time:'14:30 – 18:00', doctor:'曾冬勝 醫師' },
    { name:'夜診', time:'18:30 – 21:00', doctor:'吳焜棋 醫師' },
  ],
  4: [
    { name:'早診', time:'08:30 – 12:00', doctor:'曾冬勝 醫師' },
    { name:'午診', time:'14:30 – 18:00', doctor:'吳焜棋 醫師' },
    { name:'夜診', time:'18:30 – 21:00', doctor:'曾冬勝/黃久恩 醫師' },
  ],
  5: [
    { name:'早診', time:'08:30 – 12:00', doctor:'曾冬勝 醫師' },
    { name:'午診', time:'14:30 – 18:00', doctor:'曾冬勝 醫師' },
  ],
  6: [
    { name:'早診', time:'08:30 – 12:00', doctor:'曾冬勝 醫師' },
    { name:'午診', time:'14:30 – 18:00', doctor:'曾冬勝 醫師' },
  ],
};

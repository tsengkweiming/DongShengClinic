// ── Config ──────────────────────────────────────────────────────────────────
const SHEET_NAME = 'Bookings';
const CAPACITY   = 10;

// 0=Sun,1=Mon,2=Tue,3=Wed,4=Thu,5=Fri,6=Sat
const SCHEDULE = {
  0: [],
  1: ['早診','午診','夜診'],
  2: ['早診','午診'],
  3: ['早診','午診','夜診'],
  4: ['早診','午診','夜診'],
  5: ['早診','午診'],
  6: ['早診','午診'],
};

const SESSION_TIMES = {
  '早診': '08:30 – 12:00',
  '午診': '14:30 – 18:00',
  '夜診': '18:30 – 21:00',
};

// ── Entry point ──────────────────────────────────────────────────────────────
function doGet(e) {
  const action = e.parameter.action;
  let result;

  if (action === 'availability') {
    result = getAvailability(e.parameter.date);
  } else if (action === 'book') {
    result = makeBooking(
      e.parameter.date,
      e.parameter.session,
      e.parameter.name,
      e.parameter.phone,
      e.parameter.idNumber,
      e.parameter.isFirstVisit,
      e.parameter.note || ''
    );
  } else {
    result = { error: 'Unknown action' };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Availability ─────────────────────────────────────────────────────────────
function getAvailability(date) {
  if (!date) return { error: 'Missing date' };

  const d = new Date(date + 'T00:00:00');
  const dow = d.getDay();
  const sessions = SCHEDULE[dow] || [];

  const sheet  = getOrCreateSheet();
  const counts = countBookings(sheet, date);

  const availability = sessions.map(s => ({
    session  : s,
    time     : SESSION_TIMES[s],
    booked   : counts[s] || 0,
    capacity : CAPACITY,
    available: (counts[s] || 0) < CAPACITY,
  }));

  return { date, availability };
}

// ── Booking ───────────────────────────────────────────────────────────────────
function makeBooking(date, session, name, phone, idNumber, isFirstVisit, note) {
  if (!date || !session || !name || !phone || !idNumber || !isFirstVisit)
    return { success: false, error: '請填寫所有必填欄位' };

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(6000))
    return { success: false, error: '系統忙碌，請稍後再試' };

  try {
    const sheet  = getOrCreateSheet();
    const counts = countBookings(sheet, date);
    const booked = counts[session] || 0;

    if (booked >= CAPACITY)
      return { success: false, error: '此診次已額滿' };

    // Validate the session exists on that day
    const dow   = new Date(date + 'T00:00:00').getDay();
    const valid = (SCHEDULE[dow] || []).includes(session);
    if (!valid)
      return { success: false, error: '該日無此診次' };

    const queueNumber = booked + 1;
    sheet.appendRow([date, session, name, phone, idNumber, isFirstVisit, note, queueNumber, new Date()]);

    return { success: true, queueNumber, date, session };

  } finally {
    lock.releaseLock();
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function getOrCreateSheet() {
  const ss  = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['日期', '診次', '姓名', '電話', '身分證字號', '初/複診', '留言', '號碼', '時間戳記']);
    sheet.setFrozenRows(1);
  }
  // Force column A to plain text so dates are never auto-converted to date serials
  sheet.getRange('A:A').setNumberFormat('@');
  return sheet;
}

// Safely convert a cell value (may be Date object or string) to YYYY-MM-DD.
// Must use the spreadsheet's timezone — NOT Session.getScriptTimeZone() — because
// GAS creates Date objects relative to the spreadsheet timezone when reading cells.
function cellToDateStr(cell) {
  if (cell instanceof Date) {
    const tz = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone();
    return Utilities.formatDate(cell, tz, 'yyyy-MM-dd');
  }
  return String(cell).trim();
}

function countBookings(sheet, date) {
  const data   = sheet.getDataRange().getValues();
  const counts = {};
  for (let i = 1; i < data.length; i++) {
    if (cellToDateStr(data[i][0]) === date) {
      const s = data[i][1];
      counts[s] = (counts[s] || 0) + 1;
    }
  }
  return counts;
}

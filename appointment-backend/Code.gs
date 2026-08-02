// ── Config ──────────────────────────────────────────────────────────────────
const SHEET_NAME          = 'Bookings';
const SCHEDULE_SHEET_NAME = 'Schedule';
const CAPACITY            = 10;
const CACHE_KEY           = 'scheduleData';
const CACHE_TTL           = 21600; // seconds (6 hours)

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
  } else if (action === 'schedule') {
    result = { schedule: getCachedSchedule() };
  } else {
    result = { error: 'Unknown action' };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Schedule (read from Sheet, cached) ───────────────────────────────────────
function getCachedSchedule() {
  const cache  = CacheService.getScriptCache();
  const cached = cache.get(CACHE_KEY);
  if (cached) return JSON.parse(cached);

  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let sheet   = ss.getSheetByName(SCHEDULE_SHEET_NAME);
  if (!sheet) sheet = createScheduleSheet(ss);

  const lastRow  = sheet.getLastRow();
  const rows     = lastRow < 1 ? [] : sheet.getRange(1, 1, lastRow, 5).getValues();
  const schedule = { 0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[] };

  for (let i = 1; i < rows.length; i++) {
    const [day, session, time, doctor, active] = rows[i];
    if (active === false || active === 'FALSE' || active === 0) continue;
    const dow = parseInt(day);
    if (isNaN(dow) || dow < 0 || dow > 6) continue;
    schedule[dow].push({
      name  : String(session).trim(),
      time  : String(time).trim(),
      doctor: String(doctor).trim(),
    });
  }

  cache.put(CACHE_KEY, JSON.stringify(schedule), CACHE_TTL);
  return schedule;
}

// Creates the Schedule sheet on first deploy and pre-fills with current data.
// Staff can then edit rows directly in Google Sheets — no code changes needed.
function createScheduleSheet(ss) {
  const sheet = ss.insertSheet(SCHEDULE_SHEET_NAME);
  sheet.appendRow(['Day (0=Sun…6=Sat)', 'Session', 'Time', 'Doctor', 'Active']);
  sheet.setFrozenRows(1);

  // Mirror of schedule-data.js — edit here (in the sheet) to update both pages
  const rows = [
    [1, '早診', '08:30 – 12:00', '曾冬勝 醫師',        true],
    [1, '午診', '14:30 – 18:00', '陳鑫儀 醫師',        true],
    [1, '夜診', '18:30 – 21:00', '曾冬勝 醫師',        true],
    [2, '早診', '08:30 – 12:00', '曾冬勝 醫師',        true],
    [2, '午診', '14:30 – 18:00', '陳鑫儀 醫師',        true],
    [3, '早診', '08:30 – 12:00', '曾冬勝 醫師',        true],
    [3, '午診', '14:30 – 18:00', '曾冬勝 醫師',        true],
    [4, '早診', '08:30 – 12:00', '曾冬勝 醫師',        true],
    [4, '午診', '14:30 – 18:00', '陳鑫儀 醫師',        true],
    [4, '夜診', '18:30 – 21:00', '曾冬勝 醫師',        true],
    [5, '早診', '08:30 – 12:00', '曾冬勝 醫師',        true],
    [5, '午診', '14:30 – 18:00', '曾冬勝 醫師',        true],
    [6, '早診', '08:30 – 12:00', '曾冬勝 醫師',        true],
  ];

  sheet.getRange(2, 1, rows.length, 5).setValues(rows);
  sheet.getRange('A:A').setNumberFormat('0');
  sheet.getRange(2, 5, rows.length, 1).insertCheckboxes();
  sheet.autoResizeColumns(1, 5);

  return sheet;
}

// ── Availability ─────────────────────────────────────────────────────────────
function getAvailability(date) {
  if (!date) return { error: 'Missing date' };

  const d        = new Date(date + 'T00:00:00');
  const dow      = d.getDay();
  const schedule = getCachedSchedule();
  const sessions = schedule[dow] || [];

  const sheet  = getOrCreateSheet();
  const counts = countBookings(sheet, date);

  const availability = sessions.map(s => ({
    session  : s.name,
    time     : s.time,
    doctor   : s.doctor,
    booked   : counts[s.name] || 0,
    capacity : CAPACITY,
    available: (counts[s.name] || 0) < CAPACITY,
  }));

  return { date, availability };
}

// ── Booking ───────────────────────────────────────────────────────────────────
function makeBooking(date, session, name, phone, idNumber, isFirstVisit, note) {
  if (!date || !session || !name || !phone || !idNumber || !isFirstVisit)
    return { success: false, error: '請填寫所有必填欄位' };

  // Rate-limit: same phone may not book more than 3 times on the same day
  const allSheet = getOrCreateSheet();
  const allData  = allSheet.getLastRow() > 1
    ? allSheet.getRange(2, 1, allSheet.getLastRow() - 1, 4).getValues()
    : [];
  const phoneHits = allData.filter(r => String(r[3]) === phone && String(r[0]) === date).length;
  if (phoneHits >= 3)
    return { success: false, error: '同一電話號碼近期預約次數已達上限，如有疑問請來電洽詢。' };

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(6000))
    return { success: false, error: '系統忙碌，請稍後再試' };

  try {
    const sheet    = allSheet;
    const counts   = countBookings(sheet, date);
    const booked   = counts[session] || 0;

    if (booked >= CAPACITY)
      return { success: false, error: '此診次已額滿' };

    const dow      = new Date(date + 'T00:00:00').getDay();
    const schedule = getCachedSchedule();
    const valid    = (schedule[dow] || []).some(s => s.name === session);
    if (!valid)
      return { success: false, error: '該日無此診次' };

    const queueNumber = booked + 1;
    sheet.insertRowBefore(2);
    sheet.getRange(2, 1, 1, 9).setValues([[date, session, name, phone, idNumber, isFirstVisit, note, queueNumber, new Date()]]);

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
  return sheet;
}

function cellToDateStr(cell) {
  if (cell instanceof Date) {
    const tz = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone();
    return Utilities.formatDate(cell, tz, 'yyyy-MM-dd');
  }
  return String(cell).trim();
}

function countBookings(sheet, date) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return {};
  const data = sheet.getRange(1, 1, lastRow, sheet.getLastColumn()).getValues();
  const counts = {};
  for (let i = 1; i < data.length; i++) {
    if (cellToDateStr(data[i][0]) === date) {
      const s = data[i][1];
      counts[s] = (counts[s] || 0) + 1;
    }
  }
  return counts;
}

// ── Utilities ────────────────────────────────────────────────────────────────
// Run this manually from the Apps Script editor after editing the Schedule sheet.
function clearScheduleCache() {
  CacheService.getScriptCache().remove(CACHE_KEY);
}

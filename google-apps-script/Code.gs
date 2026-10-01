const SPREADSHEET_ID = "1r-9nKy149WYIMMKOciIumDMNzu4vJio01e33TjaXb3s";
const SHEET_NAME = "Sheet1";

function doGet() {
  return jsonResponse({ ok: true, message: "Contact endpoint ready." });
}

function doPost(event) {
  const fields = event && event.parameter ? event.parameter : {};
  if (String(fields.website || "").trim()) {
    return jsonResponse({ ok: true });
  }

  const name = cleanValue(fields.name, 120);
  const phone = cleanValue(fields.phone, 60);
  const email = cleanValue(fields.email, 254);
  const message = cleanValue(fields.message, 5000);
  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ ok: false, message: "Invalid form submission." });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error(`Sheet tab not found: ${SHEET_NAME}`);

    const now = new Date();
    const date = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd");
    sheet.appendRow([now, date, name, phone, email, message]);
  } finally {
    lock.releaseLock();
  }

  return jsonResponse({ ok: true });
}

function cleanValue(value, maxLength) {
  const text = String(value || "").trim().slice(0, maxLength);
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
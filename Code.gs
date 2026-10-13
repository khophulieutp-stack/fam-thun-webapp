/**
 * FAM THUN - Web App nhập liệu + Lũy kế
 * Deploy as Web App in Google Apps Script
 */

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('FAM THUN - Nhập liệu')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Lưu 1 dòng dữ liệu vào sheet "Data"
 * Cột: NGÀY | MÀU | SIZE | SỐ LƯỢNG | GHI CHÚ
 */
function saveData(data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Data') || ss.getSheets()[0];
    
    const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy');
    
    sheet.appendRow([
      today,                    // NGÀY
      data.mau,                 // MÀU
      data.size,                // SIZE
      Number(data.soLuong),     // SỐ LƯỢNG
      data.ghiChu || ''         // GHI CHÚ
    ]);
    
    return { success: true, message: 'Đã lưu thành công!' };
  } catch (e) {
    return { success: false, message: 'Lỗi: ' + e.message };
  }
}

/**
 * Lấy dữ liệu lũy kế theo Màu và theo Size
 */
function getSummary() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Data') || ss.getSheets()[0];
    
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return {
        byColor: { Black: 0, White: 0 },
        bySize: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
        total: 0
      };
    }
    
    // Bỏ dòng header
    const rows = data.slice(1);
    
    const byColor = { Black: 0, White: 0 };
    const bySize = { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 };
    let total = 0;
    
    rows.forEach(row => {
      const mau = String(row[1] || '').trim();
      const size = String(row[2] || '').trim().toUpperCase();
      const qty = Number(row[3]) || 0;
      
      if (mau === 'Black' || mau === 'White') {
        byColor[mau] += qty;
      }
      if (bySize.hasOwnProperty(size)) {
        bySize[size] += qty;
      }
      total += qty;
    });
    
    return { byColor, bySize, total };
  } catch (e) {
    return { error: e.message };
  }
}

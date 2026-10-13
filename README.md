# FAM THUN - Web App Nhập liệu & Lũy kế

Giao diện webapp dùng **Google Apps Script** để nhập liệu vào Google Sheet và xem lũy kế theo Màu / Size.

## Tính năng

- **Home**: Xem tổng lũy kế, theo Màu (Black/White), theo Size (XS→XXL)
- **Nhập liệu**:
  - Mã hàng & Loại cố định: `GP016570` - `Thun 2.8cm`
  - Chọn Màu: Black / White
  - Chọn 1 Size
  - Nhập Số lượng
  - Ghi chú (tuỳ chọn)
- Ngày tự động khi lưu
- Chỉ lưu 1 size mỗi lần

## Cấu trúc Google Sheet

Tạo sheet tên **`Data`**, dòng 1 ghi header:

| NGÀY | MÀU | SIZE | SỐ LƯỢNG | GHI CHÚ |

## Cách cài đặt

1. Tạo Google Sheet mới → đổi tên sheet thành `Data`
2. Ghi header như trên
3. Vào **Extensions → Apps Script**
4. Tạo 2 file:
   - `Code.gs` → copy nội dung file `Code.gs`
   - `Index.html` → copy nội dung file `Index.html` (tạo file HTML mới, đặt tên `Index`)
5. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy link Web App và sử dụng

## Cấu trúc thư mục

```
fam-thun-webapp/
├── Code.gs          # Backend Google Apps Script
├── Index.html       # Giao diện Web App
└── README.md
```

## Ghi chú

- Mỗi lần sửa code cần **Deploy lại** (Manage deployments → Edit → New version)
- Dữ liệu được lưu trực tiếp vào Google Sheet gắn với Apps Script

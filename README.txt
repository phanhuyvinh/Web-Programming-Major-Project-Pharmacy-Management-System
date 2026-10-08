==========================================================
 MedCare Pharmacy — FRONTEND (HTML / CSS / JS THUẦN)
==========================================================

Dự án frontend cho hệ thống "QUẢN LÝ HIỆU THUỐC",
sẵn sàng tích hợp ASP.NET Core Web API + SQL Server.

----------------------------------------------------------
1. CÁCH MỞ DỰ ÁN
----------------------------------------------------------
- Mở bằng VS Code (khuyến nghị) hoặc Visual Studio.
- Mở file index.html ở gốc thư mục.
- Chạy bằng extension "Live Server" (VS Code):
    Click chuột phải vào index.html → "Open with Live Server"
  → http://localhost:5500/index.html

----------------------------------------------------------
2. CẤU TRÚC THƯ MỤC
----------------------------------------------------------
  index.html                 Trang chủ
  css/                       CSS dùng chung + riêng từng khu vực
  js/                        JS dùng chung + riêng từng khu vực
  assets/                    Ảnh, icon (đang trống)
  customer/                  Khu vực Khách hàng (8 trang)
  pharmacist/                Khu vực Dược sĩ (4 trang)
  admin/                     Khu vực Quản trị (7 trang)

----------------------------------------------------------
3. CHỨC NĂNG TỪNG KHU VỰC
----------------------------------------------------------
CUSTOMER
  - login.html            Đăng nhập
  - register.html         Đăng ký
  - products.html         Tìm kiếm + lọc + sắp xếp sản phẩm
  - product-detail.html   Chi tiết sản phẩm (?id=)
  - cart.html             Giỏ hàng (localStorage demo)
  - checkout.html         Đặt hàng + upload đơn thuốc
  - orders.html           Đơn hàng của tôi
  - prescription.html     Quản lý đơn thuốc

PHARMACIST
  - index.html            Dashboard
  - pos.html              Bán tại quầy (POS)
  - online-orders.html    Xử lý đơn online
  - inventory-alert.html  Cảnh báo kho

ADMIN
  - index.html            Dashboard
  - medicines.html        CRUD thuốc
  - categories.html       CRUD danh mục
  - suppliers.html        CRUD nhà cung cấp
  - nhap-kho.html         Lập phiếu nhập kho (theo lô)
  - users.html            Quản lý người dùng + phân quyền
  - reports.html          Báo cáo doanh thu + thuốc bán chạy

----------------------------------------------------------
4. ĐĂNG NHẬP DEMO
----------------------------------------------------------
Email bắt đầu:
  "admin..."   → vào admin/index.html
  "pharma..."  → vào pharmacist/index.html
  còn lại      → vào khu vực khách hàng.

----------------------------------------------------------
5. KẾT NỐI ASP.NET CORE API
----------------------------------------------------------
- Sửa API_BASE_URL trong js/api.js:
    const API_BASE_URL = "https://localhost:7000/api";

- Các module đã sẵn sàng dùng apiGet/apiPost/apiPut/apiDelete.
- Bật CORS ở backend ASP.NET Core để chấp nhận localhost:5500.

----------------------------------------------------------
6. API DỰ KIẾN
----------------------------------------------------------
POST   /api/auth/login
POST   /api/auth/register

GET    /api/products
GET    /api/products/{id}
POST   /api/products
PUT    /api/products/{id}
DELETE /api/products/{id}

GET    /api/categories   POST /api/categories
PUT    /api/categories/{id}   DELETE /api/categories/{id}

GET    /api/suppliers   POST /api/suppliers
PUT    /api/suppliers/{id}   DELETE /api/suppliers/{id}

GET    /api/cart   POST /api/cart/items
PUT    /api/cart/items/{id}   DELETE /api/cart/items/{id}

POST   /api/orders   GET /api/orders
POST   /api/orders/{id}/approve
POST   /api/orders/{id}/cancel

GET    /api/inventory/alerts
POST   /api/pos/invoices
POST   /api/purchase-orders

GET    /api/users   POST /api/users
PUT    /api/users/{id}

GET    /api/reports/revenue
GET    /api/reports/best-selling

----------------------------------------------------------
7. DỮ LIỆU MẪU
----------------------------------------------------------
- DEMO_PRODUCTS, DEMO_ONLINE_ORDERS, DEMO_ALERTS, DEMO_USERS...
  nằm trong js/main.js, js/pharmacy.js, js/admin.js.

----------------------------------------------------------
8. TÍCH HỢP SQL SERVER (khi có backend)
----------------------------------------------------------
- Chuyển các mảng DEMO_* thành dữ liệu trả về từ API.
- Giỏ hàng: chuyển từ localStorage sang /api/cart (session/DB).
- Xác thực: dùng JWT/Bearer qua api.js (đã có sẵn header).

----------------------------------------------------------
9. ĐIỂM CẦN THAY KHI CHUYỂN SANG BACKEND THẬT
----------------------------------------------------------
- js/api.js           → Bỏ nhánh demo, chỉ dùng apiRequest.
- js/auth.js          → Dùng apiPost(API.AUTH_LOGIN/REGISTER).
- js/customer.js      → Thay DEMO_PRODUCTS bằng apiGet(API.PRODUCTS).
- js/pharmacy.js      → POS/online-orders/inventory dùng API.
- js/admin.js         → CRUD qua API + report qua /api/reports.

----------------------------------------------------------
10. TEST NHANH TỪNG USE-CASE
----------------------------------------------------------
1) Đăng ký / đăng nhập  → customer/register.html, login.html
2) Tìm kiếm & lọc       → customer/products.html
3) Giỏ hàng             → customer/cart.html
4) Đặt hàng online      → customer/checkout.html
5) Bán lẻ POS           → pharmacist/pos.html
6) Xử lý đơn online     → pharmacist/online-orders.html
7) Cảnh báo kho         → pharmacist/inventory-alert.html
8) CRUD thuốc           → admin/medicines.html
9) Nhập kho theo lô     → admin/nhap-kho.html
10) Quản lý người dùng  → admin/users.html
11) Thống kê doanh thu  → admin/reports.html

index.html (footer)
├── "Khu vực Dược sĩ"  →  customer/login.html?role=pharmacist
│       ↓ nhập pharma...   → OK → ../pharmacist/index.html
│       ↓ nhập admin...    → "Không phải Dược sĩ" → products.html
│       ↓ nhập khác        → "Không phải Dược sĩ" → products.html
│
└── "Khu vực Quản trị"  →  customer/login.html?role=admin
        ↓ nhập admin...    → OK → ../admin/index.html
        ↓ nhập pharma...   → "Không có quyền Quản trị" → products.html
        ↓ nhập khác        → "Không có quyền Quản trị" → products.html

Truy cập trực tiếp URL (ví dụ ../admin/medicines.html):
  - Chưa login  →  chuyển hướng customer/login.html?role=admin&next=...
  - Login sai role →  chuyển hướng ../index.html
  - Login đúng role →  cho phép
==========================================================
 HẾT
==========================================================
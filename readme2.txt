================================================================
   MEDCARE PHARMACY — FRONTEND (HTML / CSS / JavaScript thuần)
   Hệ thống Quản lý Hiệu thuốc + Nhà thuốc trực tuyến
================================================================

Tài liệu này mô tả:
  1. Cấu trúc thư mục chương trình
  2. Nội dung chi tiết từng file code
  3. Dữ liệu mặc định (demo) đang có trong dự án
  4. Tài khoản đăng nhập demo & phân quyền
  5. Cách chạy & kiểm thử
  6. Ghi chú tích hợp ASP.NET Core Web API + SQL Server

----------------------------------------------------------------
1. CẤU TRÚC THƯ MỤC
----------------------------------------------------------------

pharmacy-frontend/
│
├── index.html                          Trang chủ (khách hàng)
├── README.txt                          File này
│
├── css/
│   ├── main.css                        CSS dùng chung (header, layout, form, table, modal, toast, chat…)
│   ├── auth.css                        CSS trang đăng nhập / đăng ký
│   ├── customer.css                    CSS khu vực khách hàng
│   ├── pharmacy.css                    CSS khu vực dược sĩ (dashboard + POS)
│   └── admin.css                       CSS khu vực quản trị
│
├── js/
│   ├── api.js                          Trung tâm giao tiếp backend ASP.NET Core
│   ├── main.js                         Tiện ích dùng chung + dữ liệu mẫu + modal
│   ├── auth.js                         Đăng nhập / đăng ký / phân quyền / đăng xuất
│   ├── cart.js                         Giỏ hàng (localStorage demo)
│   ├── customer.js                     Logic các trang customer/*
│   ├── pharmacy.js                     Logic khu vực dược sĩ
│   ├── admin.js                        Logic khu vực quản trị
│   └── chat.js                         Tư vấn trực tuyến (khách ↔ dược sĩ)
│
├── assets/
│   ├── images/                         (trống — dùng emoji làm placeholder)
│   └── icons/                          (trống)
│
├── customer/                           Khu vực KHÁCH HÀNG
│   ├── login.html                      Đăng nhập (nhận ?role= & ?next=)
│   ├── register.html                   Đăng ký tài khoản
│   ├── products.html                   Danh sách + lọc + tìm kiếm sản phẩm
│   ├── product-detail.html             Chi tiết sản phẩm (?id=)
│   ├── cart.html                       Giỏ hàng
│   ├── checkout.html                   Đặt hàng + upload đơn thuốc
│   ├── orders.html                     Đơn hàng của tôi
│   ├── prescription.html               Quản lý đơn thuốc đã tải lên
│   └── consultation.html               💬 Tư vấn trực tuyến với dược sĩ
│
├── pharmacist/                         Khu vực DƯỢC SĨ
│   ├── index.html                      Dashboard tổng quan
│   ├── pos.html                        Bán tại quầy (POS)
│   ├── online-orders.html              Xử lý đơn hàng online
│   ├── inventory-alert.html            Cảnh báo kho
│   └── consultation.html               💬 Tư vấn trực tuyến (danh sách hội thoại)
│
└── admin/                              Khu vực QUẢN TRỊ
    ├── index.html                      Dashboard tổng quan
    ├── medicines.html                  CRUD thuốc
    ├── categories.html                 CRUD danh mục
    ├── suppliers.html                  CRUD nhà cung cấp
    ├── nhap-kho.html                   Lập phiếu nhập kho (theo lô)
    ├── users.html                      Quản lý người dùng + phân quyền
    └── reports.html                    Báo cáo doanh thu + thuốc bán chạy

Kiến trúc tổng thể:
   Frontend HTML/CSS/JS  →  HTTP/JSON  →  ASP.NET Core Web API  →  C#  →  SQL Server


----------------------------------------------------------------
2. NỘI DUNG CHI TIẾT TỪNG FILE CODE
----------------------------------------------------------------

2.1. index.html — Trang chủ
---------------------------------------------------------------
- Header: logo MedCare, thanh tìm kiếm, khu vực tài khoản (#authArea),
  giỏ hàng (#cartCount), menu điều hướng.
- Hero banner giới thiệu nhà thuốc.
- Lưới danh mục nổi bật (6 nhóm) → trỏ tới customer/products.html?cat=...
- Lưới sản phẩm nổi bật (#productList) — render từ DEMO_PRODUCTS.
- Banner "MedCare Care" + Footer 3 cột.
- Footer có link "Khu vực Dược sĩ" & "Khu vực Quản trị" (dạng
  customer/login.html?role=pharmacist|admin).
- Load script theo thứ tự: api.js → main.js → auth.js → cart.js → customer.js.

2.2. css/main.css — CSS dùng chung
---------------------------------------------------------------
- Reset + typography + biến màu (#0b8f66 chủ đạo, #d92d20 cho giá/nguy hiểm).
- Top header, search box, nav tabs, hero, categories, product card.
- Dashboard shell (.dash-layout, .dash-sidebar, .dash-main, .stat-grid).
- Bảng .tbl, form .form-grid, badge, button .btn, modal, toast.
- Chat UI: .chat-layout, .chat-panel, .chat-messages, .chat-bubble,
  .chat-conv-list, .conv-item, .conv-badge.
- Dropdown user menu (.user-menu, .user-dropdown, .ud-head).
- Responsive @900px và @600px.

2.3. css/auth.css — Trang đăng nhập / đăng ký
---------------------------------------------------------------
- .auth-page: nền gradient y tế, căn giữa.
- .auth-card: khung trắng, shadow, logo, role-hint, form, error.

2.4. css/customer.css — Khu vực khách hàng
---------------------------------------------------------------
- .catalog: layout 2 cột (sidebar filter + lưới sản phẩm).
- .filters: khối lọc danh mục & khoảng giá (sticky).
- .pd-wrap: chi tiết sản phẩm 2 cột.
- .cart-grid, .cart-item, .cart-summary.
- .checkout-grid, .order-review, .file-input-wrap (upload đơn thuốc).
- .order-card (thẻ đơn hàng).
- .rx-drop, .rx-list, .rx-item (trang đơn thuốc).

2.5. css/pharmacy.css — Khu vực dược sĩ
---------------------------------------------------------------
- .pos-layout: 2 cột (lưới sản phẩm | hóa đơn).
- .pos-search, .pos-grid, .pos-card.
- .pos-invoice, .inv-list, .inv-row, .totals.

2.6. css/admin.css — Khu vực quản trị
---------------------------------------------------------------
- .chart-box, .chart-canvas, .bar (biểu đồ cột demo).
- .filter-row (bộ lọc ngày).
- .kpi-inline, .best-selling.
- .supplier-form-block.

2.7. js/api.js — Trung tâm giao tiếp backend
---------------------------------------------------------------
- Hằng số: API_BASE_URL = "https://localhost:7000/api".
- getAuthToken(): đọc token từ localStorage.
- apiRequest(method, endpoint, body, options): hàm lõi, hỗ trợ
  cả JSON và FormData (tự bỏ Content-Type khi gửi file).
- Wrapper: apiGet / apiPost / apiPut / apiDelete.
- Object API: chứa toàn bộ endpoint dùng trong dự án
  (AUTH_LOGIN, PRODUCTS, ORDERS, POS_INVOICES, USERS, REPORT_REVENUE…).
- Object DEMO.mock(data, delay): Promise giả lập khi chưa có backend.

2.8. js/main.js — Tiện ích dùng chung
---------------------------------------------------------------
- formatPrice(v): 25000 → "25.000đ".
- formatDate/formatDateTime: định dạng ngày giờ VN.
- escapeHtml(s): chống XSS khi render.
- showToast(message, type): thông báo nổi góc phải.
- getQuery(name): đọc query string.
- LS: wrapper localStorage (get/set/remove).
- CATEGORIES: 6 danh mục (Thuốc, Vitamin, Dược mỹ phẩm, Thiết bị y tế,
  Chăm sóc cá nhân, Mẹ & Bé).
- DEMO_PRODUCTS: 8 sản phẩm mẫu (chi tiết ở mục 3).
- renderHomeProducts(): render lưới sản phẩm nổi bật cho index.html.
- openModal(html, actions) / closeModal(): modal dùng chung toàn hệ thống.

2.9. js/auth.js — Đăng nhập / phân quyền
---------------------------------------------------------------
- saveAuth(user, token) / getCurrentUser() / logout():
  lưu/đọc/xóa thông tin user trong localStorage
  (key "medcare_user", "medcare_token").
- requireLogin(redirect): chặn nếu chưa login.
- requireRole(role):
    · chưa login  → chuyển login.html?role=...
    · sai role    → thông báo + về index.html
    · admin       → được phép vào mọi khu vực (bao trùm)
- requireRoleAny(roles): tương tự nhưng cho nhiều role.
- handleLoginSubmit(e):
    · đọc role yêu cầu từ ?role=
    · suy role thực từ email (admin... / pharma... / khác)
    · admin bao trùm – nếu role yêu cầu là pharmacist & user là admin
      thì vẫn cho vào.
    · lưu user và chuyển hướng theo role.
- handleRegisterSubmit(e): validate SĐT/email/mật khẩu (>=6, khớp xác nhận).
- handleLogout(e): xác nhận + xóa session + về trang chủ phù hợp.
- customerPrefix() / dashboardHrefFor(role): tính đường dẫn tương đối.
- renderAuthArea(): thay nội dung #authArea:
    · chưa login → link "Đăng nhập"
    · đã login   → dropdown tên user + role + link dashboard + Đăng xuất
- toggleUserMenu(e): bật/tắt dropdown.

2.10. js/cart.js — Giỏ hàng (demo localStorage)
---------------------------------------------------------------
- Key lưu: "medcare_cart".
- getCart / saveCart / updateCartCount.
- addToCart(id, quantity=1).
- updateCartItem(id, quantity) / removeCartItem(id) / clearCart().
- getCartTotals({shipping=30000, freeThreshold=300000}):
  trả về {subtotal, shipping, total, count}.
- GHI CHÚ: Khi tích hợp backend thật, thay toàn bộ localStorage
  bằng /api/cart (session/DB phía server).

2.11. js/customer.js — Logic các trang khách hàng
---------------------------------------------------------------
- initProductsPage(): đọc ?q=, ?cat=; bắt sự kiện lọc theo keyword,
  danh mục, khoảng giá, sắp xếp; render lưới sản phẩm.
- initProductDetailPage(): đọc ?id= → hiển thị chi tiết; nút +/- số
  lượng; Thêm giỏ; Mua ngay.
- initCartPage(): render giỏ + tóm tắt; cho phép sửa số lượng, xóa,
  xóa hết, tính phí giao hàng.
- initCheckoutPage(): hiển thị review đơn; xử lý upload ảnh đơn thuốc
  (PNG/JPG/JPEG/PDF); validate form; lưu đơn vào localStorage
  "medcare_orders" với trạng thái "Chờ xử lý".
- initOrdersPage(): đọc "medcare_orders", render thẻ đơn hàng + badge
  trạng thái (Chờ xử lý / Đang kiểm tra / Đã duyệt / Đang giao /
  Đã giao / Đã hủy).
- initPrescriptionPage(): quản lý danh sách đơn thuốc đã tải lên
  (key "medcare_prescriptions"), xóa được.

2.12. js/pharmacy.js — Logic khu vực dược sĩ
---------------------------------------------------------------
- POS:
  · initPos() + renderPosGrid() + renderInvoice().
  · posAdd(id) / posQty(id, qty) / posRemove(id).
  · doPosCheckout(): tính subtotal + VAT 5% → xác nhận → trừ tồn kho
    của DEMO_PRODUCTS.
- Đơn online:
  · DEMO_ONLINE_ORDERS mặc định (3 đơn).
  · renderOrders(): bảng đơn + badge trạng thái.
  · viewRx(idx) / approveOrder(idx) / cancelOrder(idx).
  · Dữ liệu lưu tại "medcare_online_orders".
- Cảnh báo kho:
  · DEMO_ALERTS: 4 nhóm (nearExpiry / expired / outOfStock / lowStock).
  · initInventoryAlerts() render 4 bảng với badge màu.
- Dashboard: đọc #dashStats → hiển thị 4 thẻ số liệu mẫu
  (doanh thu 4.850.000đ, 23 đơn POS, 6 đơn online, 4 cảnh báo).

2.13. js/admin.js — Logic khu vực quản trị
---------------------------------------------------------------
- initAdminDashboard(): đọc #adminStats → hiển thị 5 số liệu mẫu.
- Thuốc (CRUD): getMedicines/saveMedicines (key "medcare_medicines").
  openMedicineForm(med) → modal thêm/sửa (name, active, category,
  price, stock, unit, supplier, desc); saveMed(id); deleteMed(id).
- Danh mục: key "medcare_categories_list"; CRUD tương tự
  (id, name, desc, số sản phẩm tự tính từ DEMO_PRODUCTS).
- Nhà cung cấp: key "medcare_suppliers"; CRUD
  (name, phone, email, address, status).
- Nhập kho: purchaseDraft[] chứa các dòng lô (thuốc, số lô, NSX,
  HSD, SL, đơn giá); validate NSX < HSD; khi lưu → cộng tồn kho
  DEMO_PRODUCTS.
- Người dùng: key "medcare_users"; CRUD
  (name, phone, email, role, status); hỗ trợ khóa/mở, phân quyền
  (admin / pharmacist / customer).
- Báo cáo: vẽ biểu đồ cột bằng <div class="bar"> (7 ngày: T2→CN,
  9–30 triệu/ngày); danh sách top 5 thuốc bán chạy.

2.14. js/chat.js — Tư vấn trực tuyến
---------------------------------------------------------------
- Keys lưu: "medcare_chat_convs" (danh sách hội thoại),
  "medcare_chat_msgs" (toàn bộ tin nhắn).
- Hàm lõi:
  · chatGetConvs / chatSaveConvs / chatGetMsgs / chatSaveMsgs.
  · chatEnsureCustomerConv(user): tạo hội thoại mới cho khách nếu chưa có.
  · chatSend(convId, senderRole, senderName, text): ghi tin + cập nhật
    lastMessage, lastUpdate, tăng unread của phía còn lại.
  · chatGetMessages(convId), chatMarkRead(convId, side).
  · chatTotalUnreadPharmacist(): tổng tin chưa đọc của dược sĩ.
  · renderChatBubble(m, isMine): render 1 bong bóng.
- Trang khách: initCustomerChat() — khung chat với "Dược sĩ MedCare",
  polling mỗi 2s, lắng nghe sự kiện storage.
- Trang dược sĩ: initPharmacistChat() — cột trái danh sách hội thoại
  (badge đỏ khi có tin mới), cột phải khung chat.
- Tự phát hiện trang qua sự hiện diện của #chatRoot và #chatConvList.

2.15. Các trang HTML — Tóm tắt vai trò
---------------------------------------------------------------
CUSTOMER:
   login.html            Form đăng nhập + đọc ?role= & ?next=;
                         nếu đã login đúng role → tự chuyển tiếp.
   register.html         Form đăng ký + validate.
   products.html         Sidebar lọc + lưới sản phẩm + sắp xếp.
   product-detail.html   Chi tiết + chọn SL + thêm giỏ/mua ngay.
   cart.html             Bảng giỏ + tóm tắt + nút tiến hành đặt hàng.
   checkout.html         Form giao hàng + upload đơn thuốc + review đơn.
   orders.html           Danh sách đơn hàng của khách.
   prescription.html     Upload & quản lý đơn thuốc.
   consultation.html     Chat với dược sĩ (1 cột).

PHARMACIST:
   index.html            Dashboard + sidebar.
   pos.html              POS 2 cột.
   online-orders.html    Bảng đơn + nút Duyệt/Hủy + Xem đơn thuốc.
   inventory-alert.html  4 bảng cảnh báo.
   consultation.html     Chat 2 cột (danh sách + khung chat).

ADMIN:
   index.html            Dashboard + sidebar.
   medicines.html        Bảng + modal CRUD thuốc.
   categories.html       Bảng + modal CRUD danh mục.
   suppliers.html        Bảng + modal CRUD NCC.
   nhap-kho.html         Form lô + bảng chi tiết phiếu nhập.
   users.html            Bảng user + modal tạo/sửa + khóa/mở.
   reports.html          Bộ lọc ngày + biểu đồ cột + top bán chạy.

Tất cả trang dashboard (pharmacist/*, admin/*) đều:
   · Có sidebar điều hướng.
   · Có link về "Trang chủ khách hàng" và "Khu vực còn lại".
   · Gọi requireRole("pharmacist") hoặc requireRole("admin") ở đầu body.
   · Admin được phép vào cả 2 khu vực.


----------------------------------------------------------------
3. DỮ LIỆU MẶC ĐỊNH (DEMO) TRONG DỰ ÁN
----------------------------------------------------------------

3.1. Sản phẩm — DEMO_PRODUCTS (js/main.js)
---------------------------------------------------------------
 ID │ Tên                     │ Hoạt chất               │ Giá      │ Tồn │ Nhóm
────┼─────────────────────────┼─────────────────────────┼──────────┼─────┼──────────────────
  1 │ Paracetamol 500mg       │ Paracetamol             │ 25.000đ  │ 120 │ Thuốc
  2 │ Vitamin C 500mg         │ Acid ascorbic           │ 60.000đ  │  85 │ Vitamin
  3 │ Nhiệt kế điện tử        │ —                       │ 85.000đ  │  30 │ Thiết bị y tế
  4 │ Kem dưỡng ẩm            │ Glycerin                │ 145.000đ │  45 │ Dược mỹ phẩm
  5 │ Nước rửa tay            │ —                       │ 42.000đ  │   0 │ Chăm sóc cá nhân
  6 │ Siro ho trẻ em          │ Cao lá thường xuân      │ 95.000đ  │  22 │ Mẹ & Bé
  7 │ Băng cá nhân            │ —                       │ 18.000đ  │ 200 │ Thiết bị y tế
  8 │ Omega 3                 │ Omega 3-6-9             │ 220.000đ │  12 │ Vitamin

Mỗi sản phẩm có các trường: id, name, category, active, price,
stock, icon (emoji), rating, unit, supplier, desc.

3.2. Danh mục — CATEGORIES (js/main.js)
---------------------------------------------------------------
 Thuốc 💊 · Vitamin 🍊 · Dược mỹ phẩm 🧴 · Thiết bị y tế 🩺 ·
 Chăm sóc cá nhân 🧼 · Mẹ & Bé 👶

3.3. Đơn online — DEMO_ONLINE_ORDERS (js/pharmacy.js)
---------------------------------------------------------------
 MC1001 │ Nguyễn Văn A │ 2× Paracetamol, 1× Vitamin C │ 110.000đ │ Chờ xử lý    │ Có ĐT
 MC1002 │ Trần Thị B   │ 1× Omega 3                    │ 220.000đ │ Đang kiểm tra │ Không
 MC1003 │ Lê Văn C     │ 3× Siro ho trẻ em             │ 285.000đ │ Đã duyệt      │ Có ĐT

Lưu tại key localStorage "medcare_online_orders".

3.4. Cảnh báo kho — DEMO_ALERTS (js/pharmacy.js)
---------------------------------------------------------------
 Cận hạn:
   Paracetamol 500mg · LOT001 · HSD 2025-03-10 · SL 40
   Vitamin C 500mg   · LOT023 · HSD 2025-04-02 · SL 25
 Đã hết hạn:
   Siro ho trẻ em    · LOT005 · HSD 2024-12-01 · SL 8
 Hết hàng:
   Nước rửa tay      · SL 0
 Sắp hết hàng:
   Omega 3           · SL 5
   Băng cá nhân      · SL 12

3.5. Nhà cung cấp — DEMO_SUPPLIERS (js/admin.js)
---------------------------------------------------------------
 1 │ NCC Dược Hậu Giang │ 0901111111 │ dhg@example.com │ Cần Thơ │ Hoạt động
 2 │ NCC Vitamin VN     │ 0902222222 │ vit@example.com │ TP.HCM  │ Hoạt động
 3 │ NCC Y tế A         │ 0903333333 │ yta@example.com │ Hà Nội  │ Ngưng

Lưu tại key "medcare_suppliers".

3.6. Người dùng — DEMO_USERS (js/admin.js)
---------------------------------------------------------------
 1 │ Admin MedCare   │ admin@medcare.vn  │ admin       │ Hoạt động
 2 │ DS. Trần Văn B  │ pharma@medcare.vn │ pharmacist  │ Hoạt động
 3 │ Nguyễn Văn A    │ a@example.com     │ customer    │ Hoạt động
 4 │ Trần Thị B      │ b@example.com     │ customer    │ Đã khóa

Lưu tại key "medcare_users".
LƯU Ý: Bảng này chỉ để hiển thị trong admin/users.html,
KHÔNG lưu mật khẩu, không dùng để đăng nhập.

3.7. Tài khoản đăng nhập demo — quy tắc suy role (js/auth.js)
---------------------------------------------------------------
 Mật khẩu: bất kỳ, chỉ cần KHÔNG RỖNG.
 Vai trò suy từ TIỀN TỐ EMAIL:

   admin@...  hoặc  adminXXX@...  → Admin
   pharma@... hoặc  pharmaXXX@... → Dược sĩ
   còn lại                        → Khách hàng

 Ví dụ:
   admin@medcare.vn    / 123456  → vào admin/index.html
   pharma@medcare.vn   / 123456  → vào pharmacist/index.html
   khachhang@gmail.com / 123456  → vào customer/products.html

 Nếu dùng chức năng đăng ký (register.html): chỉ validate form,
 KHÔNG lưu tài khoản. Sau đó phải dùng đúng tiền tố email để vào
 đúng khu vực.

 (Nếu bạn tự thêm danh sách DEMO_ACCOUNTS trong js/auth.js thì
 có thể đăng nhập bằng đúng cặp email + mật khẩu – xem ghi chú
 cuối file.)

3.8. Đơn hàng khách đã đặt — key "medcare_orders"
---------------------------------------------------------------
 Ban đầu rỗng. Mỗi lần đặt hàng ở checkout.html sẽ thêm vào đầu
 danh sách 1 object:

   {
     id: "MC" + 6 số cuối timestamp (VD: MC123456),
     createdAt: ISO datetime,
     customer: { name, phone, address, city, payment, note },
     items: [ { id, name, price, quantity, icon, unit } ],
     total: tổng tiền đã gồm phí ship,
     status: "Chờ xử lý",
     hasPrescription: true/false
   }

3.9. Đơn thuốc khách tải lên — key "medcare_prescriptions"
---------------------------------------------------------------
 Ban đầu rỗng. Mỗi file hợp lệ (PNG/JPG/JPEG/PDF) thêm 1 object:

   { name: "don-thuoc.jpg", type: "image"|"pdf",
     uploadedAt: ISO datetime }

3.10. Giỏ hàng — key "medcare_cart"
---------------------------------------------------------------
 Ban đầu rỗng. Mỗi item:

   { id, name, price, icon, unit, quantity }

3.11. Chat tư vấn — keys "medcare_chat_convs" & "medcare_chat_msgs"
---------------------------------------------------------------
 Hội thoại:
   { id, customerEmail, customerName, createdAt, lastUpdate,
     lastMessage, unreadPharmacist, unreadCustomer }

 Tin nhắn:
   { id, convId, sender: "customer"|"pharmacist", senderName,
     text, at (ISO) }

 Hội thoại được tạo tự động khi khách đăng nhập và mở
 customer/consultation.html lần đầu.

3.12. Nhãn hiển thị / trạng thái
---------------------------------------------------------------
 Trạng thái đơn hàng:
   Chờ xử lý · Đang kiểm tra · Đã duyệt · Đang giao · Đã giao · Đã hủy

 Role người dùng:
   admin · pharmacist · customer

 Trạng thái tài khoản:
   active (Hoạt động) · locked (Đã khóa) / inactive (NCC Ngưng)


----------------------------------------------------------------
4. PHÂN QUYỀN & ĐĂNG NHẬP
----------------------------------------------------------------

4.1. Luồng từ trang chủ
---------------------------------------------------------------
 Footer có 2 link:
   - customer/login.html?role=pharmacist   → khu vực Dược sĩ
   - customer/login.html?role=admin        → khu vực Quản trị

 Khi bấm:
   · Nếu CHƯA login → hiện form đăng nhập (title đổi theo role).
       - Nhập đúng tiền tố email → vào dashboard tương ứng.
       - Sai role              → thông báo + về products.html.
   · Nếu ĐÃ login & đúng role → tự chuyển thẳng dashboard
       (không hiện form).
   · Nếu ĐÃ login nhưng sai role → hiện khối "Không đủ quyền
       truy cập" + 2 nút (Vào hệ thống / Đăng xuất).

4.2. Admin bao trùm mọi khu vực
---------------------------------------------------------------
   requireRole("pharmacist") cho phép cả user có role "admin" vào.
   Điều này áp dụng cho:
     - Link footer ở index.html
     - Truy cập trực tiếp URL pharmacist/*.html
     - handleLoginSubmit khi ?role=pharmacist

4.3. Bảo vệ các trang dashboard
---------------------------------------------------------------
   Mỗi trang pharmacist/*.html:
       <script> requireRole("pharmacist"); </script>
   Mỗi trang admin/*.html:
       <script> requireRole("admin"); </script>

   Khi vi phạm:
     - Chưa login → chuyển customer/login.html?role=...&next=...
     - Sai role   → thông báo + về ../index.html

4.4. Khu vực tài khoản ở header khách hàng
---------------------------------------------------------------
   #authArea được renderAuthArea() đổ nội dung:
     · Chưa login → nút "👤 Đăng nhập"
     · Đã login   → dropdown tên user + role + link dashboard
                    + Đơn hàng + Đăng xuất.
   Nhờ đó sau khi login, header không còn hiện nút "Đăng nhập".


----------------------------------------------------------------
5. CÁCH CHẠY & KIỂM THỬ
----------------------------------------------------------------

5.1. Chạy
---------------------------------------------------------------
   Cách 1 (khuyến nghị): VS Code + Live Server
       - Chuột phải index.html → "Open with Live Server"
       - URL: http://localhost:5500/index.html

   Cách 2: Mở trực tiếp bằng trình duyệt
       - Một số tính năng (chat 2 tab, cross-file) hoạt động tốt
         hơn khi dùng Live Server.

5.2. Danh sách use-case cần test
---------------------------------------------------------------
  1) Đăng ký / Đăng nhập     → customer/register.html, login.html
  2) Tìm kiếm & lọc thuốc    → customer/products.html
  3) Quản lý giỏ hàng        → customer/cart.html
  4) Đặt hàng online         → customer/checkout.html
  5) Bán lẻ POS              → pharmacist/pos.html
  6) Xử lý đơn online        → pharmacist/online-orders.html
  7) Cảnh báo kho            → pharmacist/inventory-alert.html
  8) CRUD thuốc              → admin/medicines.html
  9) Nhập kho theo lô        → admin/nhap-kho.html
 10) Quản lý người dùng      → admin/users.html
 11) Thống kê doanh thu      → admin/reports.html
 12) Tư vấn trực tuyến       → customer/consultation.html
                               + pharmacist/consultation.html

5.3. Test chat (khuyến nghị 2 tab)
---------------------------------------------------------------
   Tab A: login khách (a@example.com) → customer/consultation.html
          → gửi "Chào dược sĩ..."
   Tab B: login dược sĩ (pharma@medcare.vn) → pharmacist/consultation.html
          → thấy badge đỏ, mở hội thoại, trả lời
   Tab A tự cập nhật trong ~2 giây (polling).


----------------------------------------------------------------
6. TÍCH HỢP ASP.NET CORE WEB API + SQL SERVER
----------------------------------------------------------------

6.1. Cấu hình CORS ở backend
---------------------------------------------------------------
   builder.Services.AddCors(o => o.AddPolicy("medcare", p =>
       p.WithOrigins("http://localhost:5500")
        .AllowAnyHeader()
        .AllowAnyMethod()));
   app.UseCors("medcare");

6.2. API dự kiến (đã khai báo trong js/api.js)
---------------------------------------------------------------
   POST   /api/auth/login
   POST   /api/auth/register

   GET    /api/products
   GET    /api/products/{id}
   POST   /api/products
   PUT    /api/products/{id}
   DELETE /api/products/{id}

   GET    /api/categories
   POST   /api/categories
   PUT    /api/categories/{id}
   DELETE /api/categories/{id}

   GET    /api/suppliers
   POST   /api/suppliers
   PUT    /api/suppliers/{id}
   DELETE /api/suppliers/{id}

   GET    /api/cart
   POST   /api/cart/items
   PUT    /api/cart/items/{id}
   DELETE /api/cart/items/{id}

   POST   /api/orders
   GET    /api/orders
   GET    /api/orders/{id}
   POST   /api/orders/{id}/approve
   POST   /api/orders/{id}/cancel

   GET    /api/inventory/alerts
   POST   /api/pos/invoices
   POST   /api/purchase-orders

   GET    /api/users
   POST   /api/users
   PUT    /api/users/{id}

   GET    /api/reports/revenue
   GET    /api/reports/best-selling

   (Chat – tuỳ chọn khi nâng cấp)
   GET    /api/consultations
   POST   /api/consultations
   GET    /api/consultations/{id}/messages
   POST   /api/consultations/{id}/messages
   POST   /api/consultations/{id}/mark-read

6.3. Điểm sửa khi chuyển sang backend thật
---------------------------------------------------------------
   · js/api.js      : đổi API_BASE_URL sang domain thật.
   · js/auth.js     : bỏ nhánh demo, dùng apiPost(API.AUTH_LOGIN/REGISTER).
   · js/customer.js : thay DEMO_PRODUCTS bằng apiGet(API.PRODUCTS).
   · js/cart.js     : thay localStorage bằng /api/cart.
   · js/pharmacy.js : POS/đơn online/cảnh báo dùng endpoint tương ứng.
   · js/admin.js    : CRUD + báo cáo dùng endpoint tương ứng.
   · js/chat.js     : thay 5 hàm chatGetConvs/chatSaveConvs/chatGetMsgs/
                      chatSaveMsgs/chatSend bằng API; có thể thay polling
                      bằng SignalR hub (/hubs/chat).

6.4. Bảng SQL Server gợi ý
---------------------------------------------------------------
   Users        (Id, Name, Phone, Email, PasswordHash, Role, Status, CreatedAt)
   Categories   (Id, Name, Description)
   Suppliers    (Id, Name, Phone, Email, Address, Status)
   Products     (Id, Name, Active, CategoryId, Price, Unit, Description,
                 ImageUrl, SupplierId)
   Batches      (Id, ProductId, LotNumber, ManufactureDate, ExpiryDate,
                 Quantity, ImportPrice)
   PurchaseOrders + PurchaseOrderDetails
   Orders       + OrderDetails + Prescriptions
   Invoices     + InvoiceDetails   (hóa đơn POS)
   Consultations(Id, CustomerEmail, CustomerName, CreatedAt, LastUpdate,
                 LastMessage)
   Messages     (Id, ConsultationId, Sender, SenderName, Text, SentAt)


----------------------------------------------------------------
7. GHI CHÚ QUAN TRỌNG
----------------------------------------------------------------

· Toàn bộ dữ liệu mẫu nằm rải ở:
     js/main.js       : DEMO_PRODUCTS, CATEGORIES
     js/pharmacy.js   : DEMO_ONLINE_ORDERS, DEMO_ALERTS
     js/admin.js      : DEMO_SUPPLIERS, DEMO_USERS
  → Khi có API thật, xoá các hằng số DEMO_* này và thay bằng fetch.

· localStorage chỉ dùng để demo frontend, KHÔNG được coi là CSDL thật.
  Khi tích hợp backend, giỏ hàng / đơn hàng / chat / người dùng phải
  được quản lý phía server (session / DB).

· Mật khẩu demo không được hash – chỉ để test UI. Khi có backend,
  phải hash (BCrypt/Identity) và KHÔNG trả về plaintext.

· Validation frontend chỉ là hỗ trợ; validation thật phải ở backend.

· Phân quyền hiện làm bằng JS (ẩn/guard). Khi có backend, quyền phải
  kiểm tra lại ở API (attribute [Authorize(Roles=...)]).

· Thứ tự <script> bắt buộc trên mọi trang:
     api.js → main.js → auth.js → (cart.js / customer.js / pharmacy.js / admin.js / chat.js)
  Nếu đặt auth.js trước main.js sẽ lỗi "escapeHtml is not defined".

· Toàn bộ đường dẫn tương đối:
     Từ customer/*, pharmacist/*, admin/*:
       CSS   : ../css/...
       JS    : ../js/...
       Index : ../index.html

· Hỗ trợ 2 phương thức upload:
     JSON (Content-Type: application/json) – mặc định
     FormData (bỏ Content-Type) – khi body là FormData (ảnh đơn thuốc)

· Không dùng framework (React/Vue/Angular/Node/PHP). Giữ nguyên
  HTML/CSS/JS thuần để dễ nhúng vào wwwroot của ASP.NET Core.

================================================================
   HẾT — MedCare Pharmacy Frontend
================================================================
# PROMPT XÂY DỰNG FRONTEND HỆ THỐNG QUẢN LÝ HIỆU THUỐC

## 1. MỤC TIÊU

Hãy xây dựng một frontend hoàn chỉnh cho đề tài:

**“QUẢN LÝ HIỆU THUỐC”**

Frontend phải vừa có giao diện giống một **website nhà thuốc trực tuyến hiện đại** như các hệ thống bán thuốc trực tuyến hiện nay, vừa có các khu vực nghiệp vụ dành riêng cho:

- Khách hàng
- Dược sĩ / Nhân viên
- Quản trị viên

Frontend phải được thiết kế để **có thể chạy trong Visual Studio và tích hợp trực tiếp với backend ASP.NET Core Web API viết bằng C# và cơ sở dữ liệu SQL Server**.

Đây là một hệ thống có kiến trúc:

```text
Frontend HTML/CSS/JavaScript
        ↓
HTTP / REST API / JSON
        ↓
ASP.NET Core Web API
        ↓
C#
        ↓
SQL Server
```

Frontend hiện tại có thể dùng dữ liệu mẫu để chạy thử giao diện, nhưng phải thiết kế sẵn để sau này thay dữ liệu mẫu bằng API thật.

---

# 2. YÊU CẦU CÔNG NGHỆ

## Bắt buộc

Sử dụng:

- HTML5
- CSS3
- JavaScript thuần
- Fetch API / AJAX
- Có thể sử dụng Bootstrap 5 nếu cần, nhưng không bắt buộc
- Font Awesome hoặc thư viện icon tương đương nếu cần

## Không sử dụng

Không dùng:

- React
- Vue
- Angular
- Next.js
- TypeScript
- PHP
- Node.js làm backend
- Laravel

Không biến dự án thành một SPA React/Vue.

Mục tiêu là frontend có cấu trúc đơn giản, dễ mở bằng Visual Studio / VS Code và dễ tích hợp vào dự án C# ASP.NET Core.

---

# 3. PHONG CÁCH GIAO DIỆN

Giao diện chính phải mang phong cách:

**website nhà thuốc trực tuyến hiện đại**

Có thể lấy cảm hứng từ cách bố trí của các website như:

- Pharmacity
- Long Châu
- các website bán thuốc hiện đại khác

Nhưng **không sao chép nguyên bản giao diện, logo, hình ảnh hoặc thương hiệu**.

Có thể xây dựng thương hiệu giả lập:

**MedCare Pharmacy**

Màu chủ đạo nên theo phong cách y tế:

- xanh lá
- xanh ngọc
- trắng
- màu nhấn nhẹ cho trạng thái

Giao diện phải:

- sạch
- hiện đại
- dễ nhìn
- rõ ràng
- phù hợp website bán thuốc
- responsive trên desktop và màn hình nhỏ
- có header, menu, footer
- có card sản phẩm
- có thanh tìm kiếm lớn
- có giỏ hàng
- có đăng nhập
- có khu vực tài khoản
- có thông tin giao hàng
- có banner / sản phẩm nổi bật

Không làm giao diện quá sơ sài kiểu form quản lý CRUD đơn thuần.

---

# 4. CẤU TRÚC THƯ MỤC BẮT BUỘC

Có thể sử dụng nhiều file `index.html`.

Mỗi khu vực có thể có `index.html` riêng, nhưng **tất cả phải liên kết với `index.html` chính**.

Cấu trúc mong muốn:

```text
pharmacy-frontend/
│
├── index.html
│
├── css/
│   ├── main.css
│   ├── auth.css
│   ├── customer.css
│   ├── pharmacy.css
│   └── admin.css
│
├── js/
│   ├── main.js
│   ├── api.js
│   ├── auth.js
│   ├── cart.js
│   ├── customer.js
│   ├── pharmacy.js
│   └── admin.js
│
├── assets/
│   ├── images/
│   └── icons/
│
├── customer/
│   ├── login.html
│   ├── register.html
│   ├── products.html
│   ├── product-detail.html
│   ├── cart.html
│   ├── checkout.html
│   ├── orders.html
│   └── prescription.html
│
├── pharmacist/
│   ├── index.html
│   ├── pos.html
│   ├── online-orders.html
│   └── inventory-alert.html
│
└── admin/
    ├── index.html
    ├── medicines.html
    ├── categories.html
    ├── suppliers.html
    ├── nhap-kho.html
    ├── users.html
    └── reports.html
```

Có thể bổ sung file nếu thực sự cần, nhưng không được phá vỡ kiến trúc tổng thể.

---

# 5. NGUYÊN TẮC LIÊN KẾT

`index.html` là **trang chính của toàn hệ thống phía frontend**.

Từ `index.html` phải có thể truy cập:

```text
Khách hàng
├── Đăng nhập
├── Đăng ký
├── Thuốc
├── Danh mục
├── Giỏ hàng
├── Đặt hàng
└── Đơn hàng

Dược sĩ
├── Dashboard
├── POS
├── Đơn online
└── Cảnh báo kho

Quản trị viên
├── Dashboard
├── Thuốc
├── Danh mục
├── Nhà cung cấp
├── Nhập kho
├── Người dùng
└── Báo cáo
```

Các trang con phải có đường dẫn quay trở lại:

```text
index.html
```

hoặc dashboard tương ứng.

Ví dụ:

```html
<a href="../index.html">Trang chủ</a>
```

Đối với `pharmacist/index.html` và `admin/index.html`, phải có liên kết rõ ràng quay lại trang khách hàng.

---

# 6. 11 USE-CASE BẮT BUỘC

Frontend phải thể hiện đầy đủ 11 use-case sau.

| STT | Actor | Use-case | Yêu cầu |
|---|---|---|---|
| 1 | Khách hàng | Đăng ký / Đăng nhập | Tạo tài khoản hoặc đăng nhập hệ thống |
| 2 | Khách hàng | Tìm kiếm & Lọc thuốc | Tìm theo tên, hoạt chất, lọc giá và nhóm bệnh |
| 3 | Khách hàng | Quản lý Giỏ hàng | Thêm, cập nhật số lượng, xóa sản phẩm |
| 4 | Khách hàng | Đặt hàng trực tuyến | Nhập giao nhận, tải ảnh đơn thuốc |
| 5 | Dược sĩ | Bán lẻ tại quầy (POS) | Tạo hóa đơn bằng AJAX/fetch, chuẩn bị trừ tồn kho |
| 6 | Dược sĩ | Xử lý đơn online | Tiếp nhận, kiểm tra, duyệt/hủy đơn |
| 7 | Dược sĩ | Xem cảnh báo kho | Xem thuốc cận hạn, hết hạn, hết hàng |
| 8 | Quản trị viên | CRUD Danh mục & Thuốc | Thêm, sửa, xóa thuốc, nhóm thuốc, nhà cung cấp |
| 9 | Quản trị viên | Lập phiếu nhập kho | Theo số lô, ngày sản xuất, hạn dùng |
| 10 | Quản trị viên | Quản lý Người dùng | Tạo tài khoản và phân quyền |
| 11 | Quản trị viên | Thống kê doanh thu | Doanh số và thuốc bán chạy |

---

# 7. KHU VỰC KHÁCH HÀNG

## 7.1. Trang chính `index.html`

Thiết kế giống website nhà thuốc trực tuyến.

Header nên có:

- Logo MedCare
- thanh tìm kiếm lớn
- đăng nhập / tài khoản
- giỏ hàng
- số lượng sản phẩm trong giỏ

Menu:

```text
Trang chủ
Thuốc
Thực phẩm chức năng
Dược mỹ phẩm
Thiết bị y tế
Mẹ & Bé
Đơn hàng
```

Có:

### Banner

Giới thiệu nhà thuốc / chăm sóc sức khỏe.

### Danh mục nổi bật

Ví dụ:

- Cảm cúm
- Tiêu hóa
- Vitamin
- Da liễu
- Thiết bị y tế
- Mẹ & Bé

### Sản phẩm nổi bật

Hiển thị dạng card:

- ảnh
- tên thuốc
- hoạt chất
- giá
- trạng thái
- nút xem
- nút thêm giỏ

### Thông tin dịch vụ

Ví dụ:

- giao hàng
- dược sĩ tư vấn
- thanh toán
- nguồn gốc sản phẩm

### Footer

Có:

- giới thiệu
- hỗ trợ
- chính sách
- liên kết khách hàng
- khu vực dược sĩ
- khu vực admin

---

# 8. USE-CASE 1: ĐĂNG KÝ / ĐĂNG NHẬP

Tạo:

```text
customer/login.html
customer/register.html
```

## Đăng nhập

Form:

- Email / số điện thoại
- Mật khẩu
- ghi nhớ đăng nhập
- nút đăng nhập
- liên kết đăng ký
- liên kết quay về trang chủ

## Đăng ký

Form:

- Họ tên
- Số điện thoại
- Email nếu cần
- Mật khẩu
- Xác nhận mật khẩu

Có validation JavaScript.

Khi có backend:

```text
POST /api/auth/login
POST /api/auth/register
```

Không hard-code tài khoản thật.

---

# 9. USE-CASE 2: TÌM KIẾM & LỌC THUỐC

Tạo:

```text
customer/products.html
```

Phải có:

### Tìm kiếm

Theo:

- tên thuốc
- hoạt chất

### Lọc

Theo:

- nhóm bệnh / nhóm thuốc
- khoảng giá

Ví dụ:

```text
Cảm cúm
Tiêu hóa
Tim mạch
Da liễu
Vitamin
```

Khoảng giá:

```text
< 100.000đ
100.000đ - 500.000đ
> 500.000đ
```

### Sắp xếp

- mặc định
- giá tăng dần
- giá giảm dần
- sản phẩm phổ biến nếu cần

### Card sản phẩm

Có:

```text
Ảnh
Tên thuốc
Hoạt chất
Giá
Tồn kho
Thêm giỏ
Xem chi tiết
```

---

# 10. TRANG CHI TIẾT SẢN PHẨM

Tạo:

```text
customer/product-detail.html
```

Hiển thị:

- ảnh
- tên
- hoạt chất
- giá
- tồn kho
- mô tả
- số lượng
- nút thêm giỏ
- thông tin sản phẩm

Có thể dùng:

```text
product-detail.html?id=1
```

để sau này lấy dữ liệu từ API.

---

# 11. USE-CASE 3: GIỎ HÀNG

Tạo:

```text
customer/cart.html
```

Giỏ hàng phải cho phép:

- thêm sản phẩm
- tăng số lượng
- giảm số lượng
- xóa
- tính thành tiền
- tính tổng tiền
- tính phí giao hàng
- hiển thị tổng đơn

Có nút:

```text
Tiến hành đặt hàng
```

Yêu cầu:

**Session phải được thiết kế ở backend khi tích hợp thật.**

Frontend có thể dùng `localStorage` ở bản demo để mô phỏng.

Không được coi `localStorage` là cơ sở dữ liệu thật.

---

# 12. USE-CASE 4: ĐẶT HÀNG TRỰC TUYẾN

Tạo:

```text
customer/checkout.html
```

Form:

- họ tên
- số điện thoại
- địa chỉ
- tỉnh/thành
- phương thức thanh toán
- ghi chú
- đơn thuốc

Phải có:

```text
📎 Tải ảnh đơn thuốc
```

Cho phép chọn:

- PNG
- JPG/JPEG
- PDF

Có phần xem lại đơn hàng.

Khi tích hợp backend dự kiến:

```text
POST /api/orders
POST /api/orders/prescription
```

---

# 13. TRANG ĐƠN HÀNG KHÁCH HÀNG

Tạo:

```text
customer/orders.html
```

Hiển thị:

- mã đơn
- ngày đặt
- sản phẩm
- tổng tiền
- trạng thái

Trạng thái có thể gồm:

```text
Chờ xử lý
Đang kiểm tra
Đã duyệt
Đang giao
Đã giao
Đã hủy
```

---

# 14. KHU VỰC DƯỢC SĨ

Tạo:

```text
pharmacist/index.html
```

Đây là một dashboard nghiệp vụ, không cần giống trang thương mại điện tử.

Có sidebar:

```text
Tổng quan
Bán tại quầy POS
Đơn online
Cảnh báo kho
```

Dashboard hiển thị:

- doanh thu hôm nay
- số đơn tại quầy
- số đơn online
- số cảnh báo kho

---

# 15. USE-CASE 5: BÁN LẺ TẠI QUẦY (POS)

Tạo:

```text
pharmacist/pos.html
```

Chức năng:

- tìm thuốc
- chọn thuốc
- thêm vào hóa đơn
- thay đổi số lượng
- xóa khỏi hóa đơn
- tính tổng tiền
- thanh toán
- tạo hóa đơn

Giao diện nên gồm 2 vùng:

```text
Bên trái:
Danh sách / tìm sản phẩm

Bên phải:
Hóa đơn bán lẻ
```

Phải sử dụng AJAX / Fetch để mô phỏng tương tác nhanh.

Khi backend hoàn thiện:

```text
POST /api/pos/invoices
```

hoặc endpoint tương đương.

Sau khi bán:

```text
Tạo hóa đơn
      ↓
Kiểm tra tồn kho
      ↓
Trừ tồn kho
```

Yêu cầu nghiệp vụ này phải thể hiện rõ trong frontend/API design.

---

# 16. USE-CASE 6: XỬ LÝ ĐƠN ONLINE

Tạo:

```text
pharmacist/online-orders.html
```

Danh sách:

- mã đơn
- khách hàng
- sản phẩm
- đơn thuốc
- tổng tiền
- thời gian
- trạng thái

Mỗi đơn có:

```text
Xem
Duyệt
Hủy
```

Nếu có đơn thuốc thì phải có chức năng:

```text
Xem ảnh đơn thuốc
```

Luồng:

```text
Khách đặt hàng
        ↓
Dược sĩ tiếp nhận
        ↓
Kiểm tra đơn thuốc
        ↓
Duyệt / Hủy
```

Dự kiến API:

```text
GET /api/orders
POST /api/orders/{id}/approve
POST /api/orders/{id}/cancel
```

---

# 17. USE-CASE 7: CẢNH BÁO KHO

Tạo:

```text
pharmacist/inventory-alert.html
```

Phải có các nhóm:

### Cận hạn

Hiển thị:

- tên thuốc
- số lô
- hạn dùng
- tồn kho

### Đã hết hạn

Hiển thị các lô hết hạn.

### Hết hàng

Hiển thị:

```text
Tên thuốc
Tồn kho = 0
```

### Sắp hết hàng

Có thể bổ sung.

Có màu trạng thái:

- xanh: bình thường
- vàng: cảnh báo
- đỏ: nguy hiểm

---

# 18. KHU VỰC ADMIN

Tạo:

```text
admin/index.html
```

Dashboard có:

- doanh thu
- đơn hàng
- số sản phẩm
- số người dùng
- cảnh báo hệ thống

Sidebar:

```text
Tổng quan
Thuốc
Danh mục
Nhà cung cấp
Nhập kho
Người dùng
Báo cáo
```

---

# 19. USE-CASE 8: CRUD THUỐC

Tạo:

```text
admin/medicines.html
```

Danh sách thuốc có:

- mã thuốc
- tên thuốc
- hoạt chất
- giá
- tồn kho
- danh mục
- nhà cung cấp
- thao tác

Thao tác:

```text
Thêm
Xem
Sửa
Xóa
```

Form thêm / sửa có:

- tên thuốc
- hoạt chất
- danh mục
- nhà cung cấp
- giá
- đơn vị
- mô tả
- hình ảnh

API dự kiến:

```text
GET    /api/products
GET    /api/products/{id}
POST   /api/products
PUT    /api/products/{id}
DELETE /api/products/{id}
```

---

# 20. QUẢN LÝ DANH MỤC

Tạo:

```text
admin/categories.html
```

Có CRUD:

- mã danh mục
- tên danh mục
- mô tả
- số sản phẩm

---

# 21. QUẢN LÝ NHÀ CUNG CẤP

Tạo:

```text
admin/suppliers.html
```

Có:

- mã nhà cung cấp
- tên
- số điện thoại
- email
- địa chỉ nếu cần
- trạng thái

Có thêm / sửa / xóa.

---

# 22. USE-CASE 9: NHẬP KHO

Tạo:

```text
admin/nhap-kho.html
```

Đây là phần bắt buộc phải thể hiện nghiệp vụ lô thuốc.

Form phải có:

- nhà cung cấp
- ngày nhập
- thuốc
- số lô
- ngày sản xuất
- hạn sử dụng
- số lượng
- đơn giá nhập

Có thể thêm nhiều dòng thuốc vào cùng một phiếu.

Ví dụ:

```text
Phiếu nhập
-----------------------------------
Paracetamol | LOT001 | 100
Vitamin C   | LOT023 | 200
-----------------------------------
```

Nút:

```text
Thêm vào phiếu
Lưu phiếu nhập
```

---

# 23. USE-CASE 10: QUẢN LÝ NGƯỜI DÙNG

Tạo:

```text
admin/users.html
```

Hiển thị:

- họ tên
- số điện thoại
- email
- vai trò
- trạng thái

Các role:

```text
Admin
Staff / Pharmacist
Customer
```

Có:

```text
Tạo tài khoản
Sửa
Khóa / mở tài khoản
Phân quyền
```

Frontend phải thể hiện sự khác nhau giữa 3 role.

---

# 24. USE-CASE 11: THỐNG KÊ DOANH THU

Tạo:

```text
admin/reports.html
```

Có bộ lọc:

```text
Từ ngày
Đến ngày
```

Hiển thị:

- doanh thu
- số đơn
- số sản phẩm bán
- giá trị trung bình / đơn

Có biểu đồ doanh thu theo ngày.

Có bảng:

**Thuốc bán chạy**

Ví dụ:

```text
1. Paracetamol
2. Vitamin C
3. Oresol
...
```

Có thể dùng Chart.js nếu cần biểu đồ trực quan, nhưng phần còn lại vẫn phải là HTML/CSS/JS thuần.

API dự kiến:

```text
GET /api/reports/revenue
GET /api/reports/best-selling
```

---

# 25. FILE `api.js`

Tạo:

```text
js/api.js
```

Đây là file trung tâm giao tiếp với backend.

Đặt:

```javascript
const API_BASE_URL = "https://localhost:7000/api";
```

Các hàm dùng chung:

```text
apiGet()
apiPost()
apiPut()
apiDelete()
```

Các module khác không nên viết URL API lặp đi lặp lại.

Mục tiêu:

```text
customer.js
pharmacy.js
admin.js
auth.js
        ↓
      api.js
        ↓
ASP.NET Core API
```

---

# 26. BACKEND API DỰ KIẾN

Frontend phải chuẩn bị cho các API tương tự:

```text
GET    /api/products
GET    /api/products/{id}

POST   /api/auth/login
POST   /api/auth/register

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

POST   /api/purchase-orders

GET    /api/users
POST   /api/users
PUT    /api/users/{id}

GET    /api/reports/revenue
GET    /api/reports/best-selling
```

Không nhất thiết phải xây backend ngay trong bước frontend, nhưng cấu trúc frontend phải sẵn sàng kết nối.

---

# 27. DỮ LIỆU MẪU

Khi chưa có backend, sử dụng dữ liệu mẫu để giao diện chạy được.

Ví dụ:

```text
Paracetamol 500mg
Vitamin C 500mg
Oresol
Sữa rửa mặt
```

Mỗi sản phẩm có:

```text
id
name
active
category
price
stock
icon/image
tag
```

Dữ liệu mẫu chỉ nhằm demo.

Không được thiết kế toàn bộ hệ thống phụ thuộc vào dữ liệu mẫu.

---

# 28. GIỎ HÀNG DEMO

Ở frontend demo có thể dùng:

```javascript
localStorage
```

để lưu giỏ hàng.

Nhưng phải ghi chú rõ:

```text
localStorage chỉ để mô phỏng frontend.
Khi tích hợp backend thật, giỏ hàng phải được quản lý phía server/session/database.
```

---

# 29. RESPONSIVE

Frontend phải hoạt động được trên:

- Desktop
- Laptop
- Tablet
- Mobile

Các thành phần phải tự co giãn:

- header
- menu
- card sản phẩm
- bảng
- form
- dashboard
- POS
- giỏ hàng

Không để nội dung bị tràn màn hình một cách nghiêm trọng.

---

# 30. QUY TẮC CODE

Code phải:

- dễ đọc
- dễ sửa
- tên file rõ ràng
- tách CSS
- tách JS
- không nhồi toàn bộ JavaScript vào HTML nếu không cần
- không nhồi toàn bộ CSS vào HTML
- sử dụng các hàm dùng chung
- hạn chế code lặp

Giữ nguyên kiến trúc HTML/CSS/JS thuần.

---

# 31. ĐƯỜNG DẪN

Vì có nhiều thư mục nên phải kiểm tra kỹ relative path.

Ví dụ từ:

```text
customer/products.html
```

đến:

```text
css/main.css
```

phải dùng:

```text
../css/main.css
```

Đến:

```text
index.html
```

phải dùng:

```text
../index.html
```

Đến:

```text
js/customer.js
```

phải dùng:

```text
../js/customer.js
```

Tương tự cho `pharmacist` và `admin`.

Không được tạo liên kết sai đường dẫn.

---

# 32. HEADER VÀ ĐIỀU HƯỚNG

Các trang khách hàng phải có điều hướng rõ ràng:

```text
Trang chủ
Thuốc
Giỏ hàng
Đơn hàng
Đăng nhập
```

Các trang dược sĩ:

```text
Dashboard
POS
Đơn online
Cảnh báo kho
Trang chủ
```

Các trang Admin:

```text
Dashboard
Thuốc
Danh mục
Nhà cung cấp
Nhập kho
Người dùng
Báo cáo
Trang chủ
```

---

# 33. TRẠNG THÁI VÀ THÔNG BÁO

Khi thao tác:

- thêm giỏ
- xóa sản phẩm
- lưu thuốc
- tạo đơn
- duyệt đơn
- hủy đơn
- lưu phiếu nhập

phải có thông báo rõ ràng cho người dùng.

Có thể dùng:

```text
Toast
Alert
Modal
```

không cần thư viện phức tạp.

---

# 34. VALIDATION

Frontend cần kiểm tra các dữ liệu cơ bản:

- trường bắt buộc
- số điện thoại
- email nếu có
- mật khẩu
- xác nhận mật khẩu
- số lượng > 0
- giá >= 0
- ngày sản xuất không sau ngày hết hạn
- hạn dùng phải hợp lệ

Nhưng validation frontend chỉ là bước hỗ trợ; validation thật vẫn phải thực hiện ở backend.

---

# 35. PHÂN QUYỀN

Thiết kế hệ thống theo 3 actor:

```text
Customer
Staff / Pharmacist
Admin
```

### Customer

Được truy cập:

```text
Trang chủ
Sản phẩm
Giỏ hàng
Checkout
Đơn hàng
Tài khoản
```

### Pharmacist / Staff

Được truy cập:

```text
Dashboard
POS
Đơn online
Cảnh báo kho
```

### Admin

Được truy cập:

```text
Dashboard
Thuốc
Danh mục
Nhà cung cấp
Nhập kho
Người dùng
Báo cáo
```

Khi backend tích hợp thật, quyền phải được kiểm tra ở backend, không chỉ ẩn menu bằng JavaScript.

---

# 36. PHẢI CHẠY ĐƯỢC NGAY KHI CHƯA CÓ BACKEND

Khi mở frontend bằng VS Code + Live Server:

```text
index.html
```

phải chạy được ngay.

Từ trang chủ phải click được vào các khu vực.

Không được để link hỏng.

Các thao tác demo cơ bản phải hoạt động:

- thêm giỏ
- tăng / giảm số lượng
- xóa giỏ
- tìm kiếm
- lọc
- sắp xếp
- đăng nhập demo
- đăng ký demo
- thêm thuốc demo
- mở modal
- tạo POS demo
- duyệt đơn demo
- xem cảnh báo kho
- xem báo cáo

---

# 37. TÍCH HỢP VISUAL STUDIO

Frontend phải thuận tiện để sau này đưa vào dự án Visual Studio / ASP.NET Core.

Không tạo cấu trúc phụ thuộc vào môi trường Node.js.

Mục tiêu cuối:

```text
Visual Studio
│
├── ASP.NET Core Web API
│
├── Controllers
├── Services
├── Models
├── Data
│
└── Frontend
    ├── index.html
    ├── css/
    ├── js/
    ├── customer/
    ├── pharmacist/
    └── admin/
```

Nếu backend phục vụ static files thì frontend phải có thể được chuyển vào `wwwroot`.

Không được thiết kế frontend theo cách bắt buộc phải dùng một framework frontend riêng.

---

# 38. CORS

Frontend phải sẵn sàng chạy kiểu:

```text
Frontend:
http://localhost:5500
```

Backend:

```text
https://localhost:7000
```

Vì vậy code API phải tách riêng ở `api.js` và không hard-code URL ở nhiều nơi.

Backend sau này sẽ cấu hình CORS.

---

# 39. README

Phải tạo:

```text
README.txt
```

Trong đó hướng dẫn:

1. cách mở project
2. cách chạy bằng Live Server
3. cấu trúc thư mục
4. chức năng từng folder
5. cách kết nối ASP.NET Core API
6. API dự kiến
7. phần nào đang dùng dữ liệu mẫu
8. phần nào sẽ dùng SQL Server khi tích hợp backend

---

# 40. YÊU CẦU VỀ KẾT QUẢ CUỐI CÙNG

Hãy tạo **một frontend hoàn chỉnh**, không chỉ tạo vài file demo.

Ít nhất phải có:

```text
index.html

customer/
    login.html
    register.html
    products.html
    product-detail.html
    cart.html
    checkout.html
    orders.html

pharmacist/
    index.html
    pos.html
    online-orders.html
    inventory-alert.html

admin/
    index.html
    medicines.html
    categories.html
    suppliers.html
    nhap-kho.html
    users.html
    reports.html
```

và:

```text
css/
    main.css
    auth.css
    customer.css
    pharmacy.css
    admin.css

js/
    main.js
    api.js
    auth.js
    cart.js
    customer.js
    pharmacy.js
    admin.js
```

Các file phải **liên kết với nhau**, chạy được ở dạng frontend demo và có kiến trúc sẵn sàng kết nối backend C# ASP.NET Core + SQL Server.

---

# 41. ĐIỀU QUAN TRỌNG: KHÔNG ĐƯỢC TỰ Ý ĐỔI HƯỚNG

Không được tự ý:

- chuyển sang React
- chuyển sang Vue
- chuyển sang Angular
- chuyển sang PHP
- dùng Node.js làm backend
- biến giao diện thành dashboard CRUD đơn thuần
- bỏ khu vực khách hàng
- bỏ khu vực dược sĩ
- bỏ khu vực admin
- gộp toàn bộ website vào một file HTML duy nhất

Phải giữ đúng mô hình:

```text
INDEX MAIN
   │
   ├── CUSTOMER
   │
   ├── PHARMACIST
   │
   └── ADMIN
```

Frontend phải mang cảm giác của **một hệ thống nhà thuốc trực tuyến thực tế**, đồng thời vẫn đáp ứng đầy đủ các use-case quản lý hiệu thuốc trong bài tập.

# 42. THỨ TỰ THỰC HIỆN

Thực hiện theo thứ tự:

### Bước 1
Tạo cấu trúc thư mục.

### Bước 2
Làm `index.html` chính hoàn chỉnh.

### Bước 3
Làm toàn bộ khu vực Customer.

### Bước 4
Làm toàn bộ khu vực Pharmacist.

### Bước 5
Làm toàn bộ khu vực Admin.

### Bước 6
Tạo CSS dùng chung + CSS riêng.

### Bước 7
Tạo JavaScript dùng chung + JavaScript riêng.

### Bước 8
Tạo dữ liệu mẫu để test.

### Bước 9
Kiểm tra toàn bộ link giữa các trang.

### Bước 10
Chuẩn bị `api.js` và các điểm kết nối ASP.NET Core API.

### Bước 11
Tạo README hướng dẫn chạy.

# 43. CÁCH TRẢ KẾT QUẢ

Khi hoàn thành, hãy trả kết quả theo dạng:

```text
1. Cấu trúc thư mục
2. Danh sách file đã tạo
3. Nội dung từng file
4. Cách chạy
5. Cách test từng use-case
6. Điểm kết nối API
7. Hướng dẫn tích hợp với ASP.NET Core
```

Không chỉ mô tả ý tưởng.

Phải cung cấp **code thực tế có thể chạy**.
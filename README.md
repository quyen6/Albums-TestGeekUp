# Album-TestGeekUp

Đây là dự án React sử dụng thư viện Ant Design để hiển thị danh sách album, người dùng, phân trang, và điều hướng chi tiết album.

## 🧰 Công nghệ sử dụng

- React
- Ant Design
- React Router
- CSS Modules / SCSS
- JSONPlaceholder API (Fake REST API)

## ⚙️ Yêu cầu hệ thống

- Node.js >= 14
- npm >= 6 hoặc yarn >= 1.22

## 🛠️ Cách cài đặt và khởi chạy dự án

1. **Clone dự án về máy**

```bash
git clone https://github.com/quyen6/Albums-TestGeekUp.git

cd Albums-TestGeekUp

```

2. **Cài đặt các thư viện cần thiết**

```bash
npm install

```

Hoặc nếu bạn sử dụng yarn:

```bash
yarn install

```

3. **Khởi chạy ứng dụng**

```bash
npm start

```

Hoặc với yarn:

```bash
yarn start

```

4.  **Mở trình duyệt và truy cập:**

```bash

http://localhost:3000

```

5. **Cấu trúc thư mục chính**
   src/
   ├── components/ # Các trang Albums, Users
   ├── assets/ # Tài nguyên như ảnh, icon, màu sắc, fonts...
   ├── hook/ # Các custom hook (ví dụ: usePaginationParams)
   ├── layout/ # Các layout dùng chung (ví dụ: DetailLayout, Aside)
   ├── App.js # Cấu hình định tuyến và layout chính
   ├── index.js # Điểm khởi tạo ứng dụng React

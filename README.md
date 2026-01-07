
# Cinevie

Cinevie là hệ thống quản lý và đặt vé xem phim, gồm 2 phần chính:
- **Frontend**: Next.js (TypeScript, TailwindCSS) tại `client/main-app`
- **Backend**: NestJS (TypeScript, MongoDB) tại `server`

## Tính năng chính

### Frontend (Next.js)
- Đặt vé xem phim, chọn ghế, chọn suất chiếu
- Quản lý tài khoản, đăng nhập/đăng ký, xác thực OTP
- Quản lý phim, rạp, suất chiếu, đồ ăn, khuyến mãi (admin)
- Giao diện responsive, hiện đại

### Backend (NestJS)
- Quản lý người dùng, phim, rạp, phòng chiếu, suất chiếu, đặt vé, đồ ăn
- Xác thực JWT, gửi mail (OTP, vé)
- API RESTful chuẩn hóa, phân quyền user/admin
- Kết nối MongoDB, upload file (ảnh phim, đồ ăn)

## Cài đặt & chạy dự án

### 1. Backend

```bash
cd server
npm install
npm run start:dev
```
- Mặc định chạy ở `http://localhost:3001` (có thể thay đổi trong `.env`)

### 2. Frontend

```bash
cd client/main-app
npm install
npm run dev
```
- Truy cập giao diện tại `http://localhost:3000`

## Cấu trúc thư mục

- `client/main-app`: Source code Next.js
- `server`: Source code NestJS
- `public/uploads`: Lưu trữ ảnh upload (phim, đồ ăn)
- `server/src/module/*`: Các module chức năng (auth, booking, flims, food, room, showtime, theater, user)

## Công nghệ sử dụng

- **Frontend**: Next.js, React, TailwindCSS, Radix UI, Axios, Framer Motion, TanStack Table, NextAuth
- **Backend**: NestJS, Mongoose, JWT, Multer, Swagger, Mailer, Bcrypt
- **Database**: MongoDB

## Scripts tiêu biểu

### Backend
- `npm run start:dev`: Chạy server ở chế độ dev
- `npm run test`: Chạy test với Jest

### Frontend
- `npm run dev`: Chạy frontend ở chế độ dev
- `npm run build`: Build production

## Đóng góp

- Fork, tạo branch mới, pull request
- Liên hệ: [LinkedIn - Truong Vu](https://linkedin.com/in/vũ trường)

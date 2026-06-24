# Ecommerce Fullstack Design

Full-stack eCommerce web application based on the **Ecommerce Web Design (Community)** Figma template.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Auth:** JWT

## Features

- Responsive design (desktop + mobile)
- Home, Product Listing, Product Detail, Cart pages
- Dynamic products from MongoDB
- Search & category filter
- JWT authentication (login/register)
- Admin panel (CRUD products)
- Cart with localStorage persistence

## Setup

### 1. Install dependencies

```bash
npm install
cd client && npm install
cd ../server && npm install
```

### 2. Configure environment

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```

### 3. Seed database

```bash
npm run seed
```

### 4. Run development servers

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Admin Credentials

- Email: `admin@ecommerce.com`
- Password: `admin123`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (search, category, pagination) |
| GET | `/api/products/:id` | Get product details |
| POST | `/api/products` | Create product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

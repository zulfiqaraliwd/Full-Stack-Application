# Vantore Virelli — E-commerce Platform

A full-stack MERN e-commerce application for premium perfumes & fashion, with a customer storefront and a separate admin dashboard.

## Tech Stack

**Frontend**
- React 18 + Vite
- React Router DOM v6
- Tailwind CSS
- Axios
- React Hot Toast (notifications)
- Heroicons

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JWT authentication
- bcryptjs (password hashing)

## Project Structure

```
ANTORE_VIRELLI-(Zulfiqar Ali)/
├── backend/
│   ├── config/
│   │   └── database.js            # MongoDB connection setup
│   ├── controllers/
│   │   ├── auth.controller.js     # Register, customer login, admin login, getMe
│   │   ├── category.controller.js
│   │   ├── order.controller.js    # Create/list orders, stock validation
│   │   ├── product.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   │   ├── auth.js                # protect (JWT verification)
│   │   └── roleCheck.js           # Restrict routes to specific roles (e.g. admin)
│   ├── models/
│   │   ├── category.model.js
│   │   ├── customer.model.js
│   │   ├── order.model.js
│   │   ├── orderItem.model.js
│   │   ├── product.model.js
│   │   └── user.model.js
│   ├── Public/
│   │   └── Images/
│   │       ├── clothing/          # Sample clothing product images
│   │       └── perfumes/          # Sample perfume product images
│   ├── routes/
│   │   ├── auth.routes.js         # /api/auth (register, login, admin-login, me)
│   │   ├── category.routes.js     # /api/categories
│   │   ├── order.routes.js        # /api/orders
│   │   ├── product.routes.js      # /api/products
│   │   └── user.routes.js         # /api/users
│   ├── seed/
│   │   └── admin.js               # Creates the default admin account
│   ├── .env                       # Environment variables
│   ├── .gitignore
│   ├── index.js                   # App entry point
│   ├── package.json
│   └── package-lock.json
│
└── frontend/
    ├── public/
    │   └── Images/                # logo.png, 1.png, 2.png
    ├── src/
    │   ├── components/
    │   │   ├── auth/
    │   │   │   ├── AdminLogin.jsx     # Dedicated /admin/login page
    │   │   │   ├── Login.jsx          # Customer login (/login)
    │   │   │   └── Register.jsx       # Customer registration
    │   │   ├── common/
    │   │   │   ├── Footer.jsx
    │   │   │   ├── Navbar.jsx
    │   │   │   └── ProductCard.jsx    # Product card with qty +/- and Add to Cart
    │   │   ├── context/
    │   │   │   ├── AuthContext.jsx    # Auth state, login/adminLogin/register/logout
    │   │   │   └── CartContext.jsx    # Cart state and quantity handling
    │   │   ├── pages/
    │   │   │   ├── Admin/
    │   │   │   │   ├── AdminDashboard.jsx
    │   │   │   │   ├── ManageOrders.jsx
    │   │   │   │   └── ManageProducts.jsx
    │   │   │   ├── Cart.jsx
    │   │   │   ├── Checkout.jsx       # Shipping form + place order
    │   │   │   ├── Home.jsx           # Hero section + featured products
    │   │   │   └── Products.jsx
    │   │   └── services/
    │   │       └── api.js             # Axios instance + all API calls
    │   ├── App.css
    │   ├── App.jsx                    # Routes, PrivateRoute, AdminRoute guards
    │   ├── index.css                  # Tailwind + shared classes (btn-primary, etc.)
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── postcss.config.js
    ├── tailwind.config.js
    └── vite.config.js
```

## Features

### Customer
- Browse products, view by category/gender/fragrance
- Add to cart with quantity increment/decrement (on product cards and cart page)
- Register / Login at `/login`
- Checkout with shipping details — stock is validated for every item before the order is placed
- Order confirmation toast: "Your order has been dispatched"

### Admin
- **Separate admin login** at `/admin/login` — admin accounts cannot sign in from the customer `/login` page, and customer accounts cannot sign in from `/admin/login`
- Admin dashboard at `/admin`
- Manage Products: create/edit/delete, supports both relative image paths (`/Images/...`) and full external image URLs (`https://...`)
- Manage Orders

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local install or a MongoDB Atlas connection string)

### 1. Backend Setup

```bash
cd backend
npm install
```

Make sure `backend/.env` has:

```
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_PASSWORD=admin123
```

Seed the default admin account:

```bash
npm run seed
```

Default admin credentials after seeding:
- Email: `admin@gmail.com`
- Password: `admin123`

Start the backend:

```bash
npm run dev      # development, with nodemon
# or
npm start        # production
```

The API runs at `http://localhost:8000`, with routes mounted under `/api`:
`/api/auth`, `/api/products`, `/api/categories`, `/api/orders`, `/api/users`.

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

If the backend runs on a different host/port, set `VITE_API_URL` in a `.env` file inside `frontend/`:

```
VITE_API_URL=http://localhost:8000
```

## Login URLs

| Role     | URL             |
|----------|-----------------|
| Customer | `/login`        |
| Admin    | `/admin/login`  |

## Notes

- Product images support two formats: a relative path served by the backend (`/Images/perfumes/perfume 1.avif`) or a full external URL (`https://...`). Both are handled correctly across product cards, cart, and the admin product table.
- Order placement validates stock for every item before creating the order — if any item doesn't have enough stock, the order is rejected with a clear message instead of failing partway through.
- Auth state stays in sync across multiple open browser tabs (logging in/out in one tab updates the others automatically).
"# Full-Stack-Application" 

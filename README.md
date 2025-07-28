# 🍽️ Share The Meal 

**Share The Meal ** is a full-stack MERN application designed to reduce food waste by connecting **Restaurants**, **Charities**, and **Users**. Restaurants can donate surplus food, charities can request and pick it up, and users can browse and save food listings. Admins have full control over donations, users, roles, transactions, and more.

🔐 All sensitive operations are secured using **JWT Authentication**, and **Stripe** is used to handle secure payments for Charity role requests.

---

## 🔗 Live Website

🌐 **Live Site**: [https://share-the-meal-fde40.web.app/](https://share-the-meal-fde40.web.app/)

## 🍴  User Credentials

- **Email**: `your_Email_id@gmail.com`
- **Password**: `1Aa...`

---

---

## 🛠️ Admin Credentials

- **Email**: `sakib789@gmail.com`
- **Password**: `123San`

---

---

## ✅  Charity Credentials

- **Email**: `kabir34@gmail.com`
- **Password**: `123San`

---

## ✅  Restaurant Credentials

- **Email**: `sanrize@gmail.com`
- **Password**: `123San`

---

---

## 🚀 Key Features

1. 🔐 Secure authentication with Email/Password and Google Login.
2. 💳 Stripe payment integration for Charity role requests.
3. 🍱 Restaurants can add, edit, and delete food donations.
4. 🎯 Charities can request, confirm pickup, and review donations.
5. ❤️ Users can save donations to Favorites and add Reviews.
6. 🧾 Admin Dashboard to manage users, donations, roles, and transactions.
7. 📊 Donation analytics using Recharts.
8. 🌐 Mapbox integration for visualizing donation locations.
9. 🔍 Search and sort donations by location, quantity, and time.
10. 🔔 SweetAlert2 and React Toastify used for all user notifications.

---

## 🖼️ Pages Overview

### Public Routes
- `/` — Home (Banner, Featured Donations, Stats, Community Stories)
- `/login` — Login/Register (with social login)
- `*` — 404 Not Found Page

### Protected Routes
- `/alldonations` — Verified donations with filters
- `/donation/:id` — Donation Details with request and review options
- `/dashboard` — Role-based dashboard (User, Charity, Restaurant, Admin)

---

## 📂 Project Structure

client/

│
├── src/

│ ├── components/ # Navbar, cards, buttons, modals, etc.

│ ├── layouts/ # Page layout files (MainLayout, DashboardLayout)

│ ├── pages/ # All main page components

│ ├── routes/ # Protected and role-based route logic

│ ├── context/ # Authentication and TanStack Query providers

│ ├── hooks/ # Custom hooks (e.g., useAuth, useAxiosSecure)

│ ├── services/ # API services (Axios instance)

│ ├── utils/ # Utility/helper functions

│ └── App.jsx # Main entry point
│
├── .env # Environment variables (API URL, Stripe Key)

├── README.md # This file

└── ...


---

## ⚙️ Tech Stack

- **React.js (Vite)**
- **Tailwind CSS + DaisyUI** — UI styling
- **Firebase** — Authentication (Email & Google)
- **React Hook Form** — Form validation and handling
- **Tanstack React Query** — Data fetching and mutation
- **SweetAlert2 + React Toastify** — Alerts and toasts
- **Stripe Checkout** — Secure payments
- **Mapbox** — Location mapping
- **JWT** — Secure route protection
- **Recharts** — Charts and statistics

---

## 🔐 Authentication & Security

- JWT tokens are stored in `localStorage`.
- Custom Axios interceptor handles expired or unauthorized tokens.
- Firebase’s `onAuthStateChanged()` maintains session persistence across reloads.

---

## 💡 Unique Functionalities

- ♻️ Real-world food donation workflow simulation.
- ⭐ Admin can feature verified donations on Home Page.
- 💸 Payment history and transaction tracking via Stripe.
- 🌍 Filter donations based on city, zip code, or pickup time.
- 🧾 Role-based dashboards for each type of user.

---

## 🧪 Development Summary

- ✅ 20+ meaningful commits on the client-side
- ✅ Complete CRUD operations for all user roles
- ✅ Fully responsive across all devices
- ✅ Tested thoroughly with all demo accounts

---

👤 Author

Sanjid Talukder

🎓 CSE Student, Dhaka International University

💼 Junior Web Developer

📍 Dhaka, Bangladesh

📧 Email: sanjidtalukder02@gmail.com

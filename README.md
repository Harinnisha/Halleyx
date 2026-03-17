# HalleyX Dashboard Builder

A modern, premium, and fully-featured dashboard builder platform that allows users to monitor their customer orders, revenue, and analytics in real-time. This project features a sophisticated drag-and-drop dashboard interface, secure authentication, and detailed order tracking.

---

## 🚀 Features

- **🔐 Secure Authentication**: Full user login and registration powered by **Supabase Auth**.
- **📊 Dynamic Dashboard Builder**:
  - Drag-and-drop widgets using `react-grid-layout`.
  - Resizable and customizable components.
  - Responsive layouts for all screen sizes.
- **📈 Advanced Analytics**:
  - KPI cards for "at-a-glance" performance metrics.
  - Interactive charts (Bar, Pie, Line, Area) for revenue distribution.
- **🛒 Order Management**:
  - Full CRUD functionality for customer orders.
  - **Live Timeline Tracking**: Premium tracking modal (Placed -> Processing -> Shipped -> Delivered).
- **☁️ Cloud Powered**: Fully migrated from MongoDB to **Supabase** for high-performance cloud storage and security.

---

## 🛠️ Technology Stack

| Part | Tech |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, Zustand |
| **Backend** | Node.js, Express, Supabase SDK |
| **Database** | PostgreSQL (Supabase) |
| **Icons** | Lucide React |
| **Charts** | Chart.js 4+ |

---

## 📦 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- A [Supabase](https://supabase.com/) account.

### 2. Database Setup (Supabase)
1. Go to your **Supabase Dashboard** → **SQL Editor**.
2. Run the provided schema script (find it in `docs/supabase_schema.sql` or use the one created during development) to create the `orders` table and enable RLS (Row Level Security).

### 3. Frontend Configuration
Navigate to the `dashboard` directory:
```bash
cd dashboard
npm install
```
Create a `.env` file with your credentials:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```
Run the frontend:
```bash
npm run dev
```

### 4. Backend Configuration (Optional Proxy)
Navigate to the `backend` directory:
```bash
cd backend
npm install
```
Create a `.env` file:
```env
SUPABASE_URL=your_project_url
SUPABASE_KEY=your_key
PORT=5000
```
Run the backend:
```bash
npm run dev
```

---

## 🔐 Security & Production
- **Row Level Security (RLS)** is enabled on all tables. Users can only see and edit the data they created.
- Sensitive environment variables are excluded from version control via `.gitignore`.

---

## 📄 License
This project is for demonstration and UX design purposes.

&copy; 2026 **HalleyX**. All rights reserved.

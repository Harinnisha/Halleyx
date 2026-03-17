🚀 HalleyX Dashboard Builder

A modern, premium dashboard builder to track orders, revenue, and analytics in real-time.

🌐 Live Demo

🎥 Watch the full demo here:
👉 https://youtu.be/S64vNzFzHtY

✨ Overview

HalleyX Dashboard Builder is a powerful full-stack web application that allows users to:

Build customizable dashboards (drag & drop)

Track customer orders in real-time

Analyze business performance using charts

Manage data securely using cloud backend

🔥 Key Features
🔐 Authentication

Secure login & signup using Supabase Auth

Session management & protected routes

📊 Dashboard Builder

Drag-and-drop widgets (react-grid-layout)

Fully responsive layouts

Resize & customize components

📈 Analytics

KPI cards (Revenue, Orders, Growth)

Charts:

Bar Chart

Pie Chart

Line Chart

Area Chart

🛒 Order Management

Full CRUD operations

Real-time updates

🧭 Timeline tracking:

Placed → Processing → Shipped → Delivered

☁️ Cloud Backend

Powered by Supabase (PostgreSQL)

High performance & scalability

Secure Row Level Security (RLS)

🧱 Tech Stack
Layer	Technology
Frontend	React, Vite, Tailwind CSS
State	Zustand
Backend	Node.js, Express
Database	Supabase (PostgreSQL)
Charts	Chart.js
Icons	Lucide React
📂 Project Structure
HalleyX/
│
├── dashboard/        # Frontend (React)
├── backend/          # Node.js API
├── docs/             # SQL schema
└── README.md
⚙️ Setup Instructions
🔹 1. Clone the Repository
git clone https://github.com/your-username/halleyx-dashboard.git
cd halleyx-dashboard
🔹 2. Frontend Setup
cd dashboard
npm install

Create .env file:

VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key

Run:

npm run dev
🔹 3. Backend Setup
cd backend
npm install

Create .env file:

SUPABASE_URL=your_project_url
SUPABASE_KEY=your_key
PORT=5000

Run:

npm run dev
🔹 4. Database Setup

Go to Supabase Dashboard → SQL Editor

Run your schema file:

-- Example
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID,
  status TEXT,
  created_at TIMESTAMP
);

Enable Row Level Security (RLS)

🔐 Security

✅ Row Level Security (RLS)

✅ User-specific data isolation

✅ Environment variables protected

💡 Future Improvements

📱 Mobile app version

🔔 Real-time notifications

📦 Inventory management

📊 AI-based analytics insights

📸 Screenshots (Add yours here)
![Dashboard Screenshot](./screenshots/dashboard.png)
![Analytics Screenshot](./screenshots/analytics.png)
🏆 Why This Project is Strong

Full-stack (Frontend + Backend + Database)

Real-world use case (orders + analytics)

Modern tools (React + Supabase)

Clean UI + advanced features

👉 Perfect for:

Resume

Portfolio

Interviews

📄 License

This project is for learning and demonstration purposes.

© 2026 HalleyX

🙌 Author

Harinisha K

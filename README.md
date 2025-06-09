# 🍽️ DineManager - Restaurant Management System

Restaurant Management System featuring a real-time **Admin Dashboard**, **Ordering System** — hosted on a single server.

## 🔗 Live Demo
> amin dashboard: https://dine-manager-u31d.vercel.app/analytics

> order system(Mobile view): https://dine-manager.vercel.app

---

## ⚙️ Tech Stack

- **Frontend:** React.js, Recharts, React Router (Nested Routes)
- **Backend:** Node.js, Express.js, MongoDB
- **Cron Jobs:** For real-time dashboard metrics
- **Deployment:** Vercel (Frontend) + Render (Backend API)

---

## 🚀 Features Overview

### 1. 📊 Dashboard Analytics
- Overview of:
  - 👨‍🍳 Total Chefs
  - 💰 Total Revenue
  - 📦 Total Orders
  - 👥 Total Clients
- Charts:
  - **Daily Revenue** (Mon-Sun) - `Recharts`
  - **Order Summary Pie Chart**: Dine In %, Take Away %, Served %

---

### 2. 🍽️ Table Management
- View all tables (Table-01 to Table-30+)
- Status: `Reserved` / `Available`
- Chair count for each table
- ✅ Add/Delete Tables
- 🔍 Filter by table number 

---

### 3. 🧾 Order Management
- Order Types: `Dine In`, `Take Away`
- Status Workflow:
  - `Processing`, `Served`, `Not Picked Up`, ` Picked Up`
- Includes:
  - Unique Order ID
  - Timestamp
  - Table ID
  - Total Items
  - 🍳 Cooking Instructions

---

### 4. 🍔 Menu Management
- 🛒 Interactive Item Cards:
  - Name, Price, Add/Remove to/from Cart
- ✅ “Swipe to Order” (Mobile Friendly)
- Cart Breakdown:
  - Subtotal, Delivery Charges, Tax, Grand Total
- 🧾 Order Modes: Dine In / Take Away

---

### 5. 📦 Checkout & Delivery
- Collect:
  - Customer Name, Phone, Delivery Address
  - Instructions per item
- ⏳ Show Estimated Delivery Time

---

### 6. 👨‍🍳 Chef Order Assignment
- List of Chefs (e.g., Manesh, Pritam, Yash, Tenzen)
- Track:
  - Orders assigned to each chef having less time remaining
  - Workload distribution

---

### 7. 💳 POS (Point of Sale) Touch UI
- 📲 On-Screen Keyboard for input
- 🛒 Cart remains visible during browsing
- ➡️ “Next” button to proceed easily

---

## 🧠 Features

- **Real-time Analytics Update** via `cron jobs` in backend
- **Nested Routing** for scalable Admin Dashboard
- **Responsive Mobile Ordering System**
- **Swipe to Order** (Mobile Friendly)
- **Per-item Instructions Field** for custom cooking preferences




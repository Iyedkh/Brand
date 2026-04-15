# GRAVITY Fashion - MERN E-Commerce

A premium, production-ready clothing e-commerce platform inspired by modern brands like Zara and Bershka.

## 🧱 Tech Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Multer
- **Frontend**: React (Vite), Tailwind CSS 4, Zustand, Framer Motion, Lucide React
- **Architecture**: MVC (Backend), Component-based (Frontend)

## 🚀 Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
NODE_ENV=development
```
Seed the database:
```bash
npm run data:import
```
Start the server:
```bash
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## ✨ Features

- **Minimalist UI**: Clean fashion aesthetic with smooth animations.
- **Product Management**: Category filtering, size/color selection, search.
- **Cart System**: Fully functional bag management with local persistence.
- **User Auth**: Secure JWT-based login/registration with role-based access.
- **Admin Dashboard**: Real-time stats and management interface.
- **Responsive**: Mobile-first design for seamless shopping on any device.

## 📁 Structure

- `backend/`: Server logic, models, routes, and controllers.
- `frontend/`: UI components, pages, state stores, and styles.

## 🎨 Design Philosophy

Gravity uses a monochrome palette (Black, White, Gray) to emphasize product photography. Every interaction is designed to feel fluid and premium, using `Framer Motion` for micro-animations and `Inter` typography for readability.

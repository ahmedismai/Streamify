# ✨ Fullstack Chat & Video Calling App ✨

A modern, real‑time chat & video calling platform built for language exchange and global communication.

![App Screenshot](./Frontend/public/screenshot-for-readme.png)

## 🚀 Live Demo

- **Frontend**: [https://streamify-6saj.vercel.app](https://lingostream.netlify.app/)  
- **Backend**: [https://streamify-production-27b0.up.railway.app](https://streamify-production-27b0.up.railway.app)

---

## 🌟 Features

- 💬 **Real-Time Chat** – Instant messaging with typing indicators, reactions, and read receipts  
- 📞 **1-on-1 & Group Video Calling** – Supports screen sharing and call recording  
- 🔐 **Authentication System** – Signup, login, onboarding, forgot/reset password with JWT  
- 🧑‍🤝‍🧑 **Language Exchange Matching** – Based on native & learning languages, location, and bio  
- 🎨 **32 UI Themes** – Powered by DaisyUI  
- 🌐 **Responsive & Mobile-Friendly** – Optimized for all screen sizes  
- ⚙️ **Tech Stack** – React (Vite) + Express + MongoDB + TailwindCSS + Zustand + TanStack Query  
- 🧠 **State Management** – Using Zustand for global state  
- 🚨 **Robust Error Handling** – On both frontend and backend  
- 📦 **Scalable Real-Time Infrastructure** – Built with [Stream Chat & Video SDK](https://getstream.io)  
- ☁️ **Free Deployment** – Vercel (frontend) + Railway (backend)

---

## 🛠️ Tech Stack

**Frontend**:
- React (Vite)
- Tailwind CSS + DaisyUI
- Zustand
- TanStack Query
- React Router
- Stream Chat & Video SDK

**Backend**:
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- CORS, Cookie Parser, dotenv

---

## 🧑‍💻 Local Development Setup

You'll need two terminals running for frontend and backend.

### 1. Backend Setup (`/backend`)

```bash
cd backend
npm install

# Create a .env file in /backend with the following variables:
PORT=5001
MONGO_URI=your_mongo_uri
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development

npm run dev

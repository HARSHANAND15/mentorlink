# 🎓 MentorLink — AI-Powered Mentorship Marketplace

<div align="center">

![MentorLink Banner](https://img.shields.io/badge/MentorLink-AI%20Mentorship%20Platform-7c3aed?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)

**Connect aspiring professionals with verified industry mentors through AI-powered 1:1 mentorship sessions.**

[Live Demo](#) · [Report Bug](https://github.com/HARSHANAND15/mentorlink/issues) · [Request Feature](https://github.com/HARSHANAND15/mentorlink/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Author](#author)

---

## 🚀 About The Project

MentorLink is a full-stack web-based mentorship marketplace that enables aspiring professionals to discover, book, and manage 1:1 mentorship sessions with verified industry experts across EdTech, FinTech, SaaS, Design, and Career domains.

Unlike traditional mentorship platforms requiring long-term subscriptions, MentorLink follows a **per-session pricing model** — pay only for the sessions you need. Powered by Groq LLM for AI mentor matching and Razorpay for secure payments.

---

## ✨ Features

### 👤 User Features
- 🔐 JWT-based authentication with role-based access control (Mentor / Mentee)
- 🔍 Browse 500+ verified mentors with advanced filters (Domain, Price, Rating, Availability)
- 🤖 AI-powered mentor matching using Groq LLM
- 📅 Session booking with availability slot selection
- 💳 Secure per-session payments via Razorpay (UPI, Card, Net Banking)
- ⭐ Review and rating system after completed sessions
- 📧 Email confirmations and session reminders via Nodemailer

### 🎓 Mentor Features
- 📊 Earnings dashboard with payout tracking
- 🗓️ Availability slot management
- 📈 Session history and statistics
- 💰 Transparent earnings — no hidden platform cuts

### 🌐 Platform Features
- 🌙 Dark / Light mode toggle
- 📱 Fully responsive design (Bootstrap)
- 📰 Blog with categories and newsletter subscription
- 🔔 Real-time notifications via Socket.io
- 🧠 AI Quiz Generator using Groq API

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI Framework |
| Vite | Build Tool |
| Bootstrap 5 + React-Bootstrap | Styling |
| React Router DOM | Client-side Routing |
| Axios | HTTP Client |
| Socket.io Client | Real-time Communication |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | Server & REST APIs |
| TypeScript | Type Safety |
| MongoDB + Mongoose | Database & ODM |
| JWT + bcryptjs | Authentication & Security |
| Razorpay | Payment Gateway |
| Socket.io | Real-time Notifications |
| Groq SDK | AI Mentor Matching & Quiz |
| Nodemailer | Email Service |
| Multer + Cloudinary | File Upload & Storage |
| node-cron | Scheduled Tasks |

---

## 📁 Project Structure

mentorlink/
│
├── 📁 backend/
│ ├── src/
│ │ ├── config/ # DB, Cloudinary, Razorpay config
│ │ ├── controllers/ # Route controllers
│ │ ├── middlewares/ # Auth, role, upload, error handlers
│ │ ├── models/ # Mongoose models
│ │ ├── routes/ # Express routes
│ │ ├── services/ # Email, AI, Socket, Cron services
│ │ └── utils/ # Helper functions
│ ├── server.ts
│ └── package.json
│
└── 📁 frontend/
├── src/
│ ├── api/ # Axios API calls
│ ├── components/ # Reusable components
│ │ ├── common/ # Navbar, Footer, Loader, etc.
│ │ ├── mentor/ # MentorCard, SlotPicker, etc.
│ │ ├── booking/ # BookingCard, BookingStatus
│ │ └── payment/ # RazorpayButton
│ ├── context/ # AuthContext, ThemeContext
│ ├── hooks/ # Custom React hooks
│ ├── pages/ # All page components
│ │ ├── auth/ # Login, Signup
│ │ ├── mentor/ # MentorList, MentorDetail, Dashboard
│ │ ├── mentee/ # MenteeDashboard
│ │ ├── booking/ # BookSession
│ │ └── profile/ # EditProfile
│ ├── types/ # TypeScript interfaces
│ └── utils/ # formatCurrency, formatDate
└── package.json


---

## 🏁 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Razorpay account
- Groq API key
- Cloudinary account

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/HARSHANAND15/mentorlink.git
cd mentorlink
```

**2. Backend Setup**
```bash
cd backend
npm install
```

**3. Frontend Setup**
```bash
cd ../frontend
npm install
```

**4. Environment Variables Setup**

Create `.env` files (see [Environment Variables](#environment-variables) section below)

**5. Run Development Servers**

Backend (Terminal 1):
```bash
cd backend
npm run dev
```

Frontend (Terminal 2):
```bash
cd frontend
npm run dev
```

**6. Open in Browser**

http://localhost:5173


---

---

## 🌐 Pages Overview

| Page | Route | Access |
|---|---|---|
| Home | `/` | Public |
| Find Mentors | `/mentors` | Public |
| Mentor Detail | `/mentors/:id` | Public |
| Domains | `/domains` | Public |
| Blog | `/blog` | Public |
| Login | `/login` | Guest |
| Signup | `/signup` | Guest |
| Book Session | `/book/:mentorId` | Mentee |
| Mentee Dashboard | `/dashboard/mentee` | Mentee |
| Mentor Dashboard | `/dashboard/mentor` | Mentor |
| Edit Profile | `/profile/edit` | Auth |

---

Page	Route	Access
Home	/	Public
Find Mentors	/mentors	Public
Mentor Detail	/mentors/:id	Public
Blog	/blog	Public
Login	/login	Guest
Signup	/signup	Guest
Book Session	/book/:mentorId	Mentee
Mentee Dashboard	/dashboard/mentee	Mentee
Mentor Dashboard	/dashboard/mentor	Mentor
Edit Profile	/profile/edit	Auth
Author

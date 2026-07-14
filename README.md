# 🚀 Spot & Solve

> **A Modern Civic Issue Reporting Platform powered by React & Supabase**

[![React](https://img.shields.io/badge/React-19-blue?logo=react)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)]()
[![Vite](https://img.shields.io/badge/Vite-Latest-purple?logo=vite)]()
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green?logo=supabase)]()
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwind-css)]()
[![License](https://img.shields.io/badge/License-MIT-yellow)]()

---

# 📌 Overview

**Spot & Solve** is a modern, scalable, and transparent civic issue reporting platform that empowers citizens to report public infrastructure problems while enabling administrators to efficiently verify, prioritize, manage, and resolve them.

The platform bridges the communication gap between citizens and local authorities through geotagged reporting, real-time progress tracking, community participation, and transparent issue resolution.

Unlike traditional complaint systems, Spot & Solve focuses on usability, accountability, and community engagement.

---

# 🎯 Problem Statement

Many civic complaint portals suffer from:

- Poor user experience
- Lack of transparency
- Duplicate complaints
- No community participation
- No issue prioritization
- Limited progress tracking
- Weak communication between citizens and authorities

Spot & Solve addresses these challenges with a modern, user-friendly, and scalable solution.

---

# ✨ Key Features

## 👤 Citizen Features

- Secure Registration & Login
- Report Civic Issues
- Upload Geotagged Images
- Automatic Location Detection
- View Nearby Issues
- Upvote Existing Issues
- Duplicate Issue Detection
- Issue Timeline Tracking
- Edit Own Issues
- Profile Management
- Comment on Issues

---

## 👮 Administrator Features

- Secure Login
- Dashboard Analytics
- Manage Reported Issues
- Verify New Reports
- Update Issue Status
- Upload Resolution Images
- Add Progress Updates
- Manage Categories
- View Community Statistics
- Comment on Issues

---

# 🏗 Project Architecture

```
Citizen
        │
        ▼
React Frontend
        │
        ▼
Supabase Authentication
        │
        ▼
Supabase PostgreSQL Database
        │
 ┌──────┴─────────┐
 ▼                ▼
Storage      Row Level Security
```

---

# 🛠 Tech Stack

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- Lucide React

---

## Backend

- Supabase
- PostgreSQL
- Supabase Authentication
- Supabase Storage

---

## Maps

- Leaflet
- OpenStreetMap

---



## Deployment

- Vercel
- Supabase

---

# 📂 Project Structure

```
SpotAndSolve/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── features/
│   │   ├── auth/
│   │   ├── issues/
│   │   ├── notifications/
│   │   ├── profile/
│   │   └── admin/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   │   └── supabase.ts
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
│
├── PROJECT.md
├── DATABASE.md
├── FEATURES.md
├── UI_GUIDELINES.md
├── ROADMAP.md
├── README.md
└── ANTIGRAVITY_PROMPT.md
```

---

# 🗄 Database Design

The project uses a normalized relational database with Supabase PostgreSQL.

Main tables include:

- Profiles
- Categories
- Issues
- Issue Images
- Votes
- Issue Updates
- Comments
- Notifications

Authentication is managed using **Supabase Auth**, while images are stored securely using **Supabase Storage**.

---

# 🔐 Authentication

Authentication is handled entirely by **Supabase Auth**.

Features include:

- User Registration
- Login
- Logout
- Session Persistence
- Protected Routes
- Role-Based Access Control
- Secure Authentication

Passwords are never stored within the application database.

---

# 📍 Core Workflow

```
User Registration
        │
        ▼
Login
        │
        ▼
Dashboard
        │
        ▼
Report Issue
        │
        ▼
Duplicate Detection
        │
        ▼
Issue Created
        │
        ▼
Administrator Verification
        │
        ▼
Progress Updates
        │
        ▼
Resolution Submitted
        │
        ▼
Citizen Verification
        │
        ▼
Issue Closed
```

---

# 🌍 User Roles

## Citizen

- Report Issues
- Upload Images
- Upvote Issues
- Track Progress
- Receive Notifications
- Verify Resolution

---

## Administrator

- Verify Reports
- Manage Issues
- Upload Completion Photos
- Update Status
- Manage Categories
- View Analytics

---

# 🎨 UI & UX

The interface follows modern SaaS design principles.

Design goals include:

- Clean Layout
- Responsive Design
- Accessibility
- Smooth Animations
- Consistent Components
- Mobile Friendly
- Fast User Experience

---

# 📱 Responsive Design

Spot & Solve is fully responsive for:

- Desktop
- Laptop
- Tablet
- Mobile Devices

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/your-username/SpotAndSolve.git

cd SpotAndSolve
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL

VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

---

## Run the Development Server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

# 📦 Build for Production

```bash
npm run build
```

---

# 🚀 Deployment

Frontend

- Vercel

Backend

- Supabase

Simply configure the required environment variables in Vercel before deployment.

---

# 🔮 Future Enhancements

The architecture is designed to support future features such as:

- AI Duplicate Detection
- AI Severity Prediction
- Push Notifications
- Progressive Web App (PWA)
- Offline Reporting
- Department Assignment
- GIS Heatmaps
- Leaderboards
- Public Dashboard
- Dark Mode
- Multi-language Support

---

# 📖 Documentation

Project documentation includes:

- PROJECT.md
- DATABASE.md
- FEATURES.md
- UI_GUIDELINES.md
- ROADMAP.md
- ANTIGRAVITY_PROMPT.md

These documents define the complete architecture, design, features, and development process.

---

# 🤝 Contributing

Contributions are welcome.

Please follow the coding standards and project architecture described in the documentation before submitting pull requests.

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Sameera Sangadi**

Engineering Student | Full Stack Developer | AI Enthusiast

---

# 🌟 Acknowledgements

Special thanks to:

- React
- Supabase
- Vite
- Tailwind CSS
- OpenStreetMap
- Leaflet
- Framer Motion
- Lucide React

for providing the technologies that power this project.

---

# ⭐ Vision

Spot & Solve is more than a college project.

It is designed as a scalable civic technology platform capable of evolving into a real-world solution for municipalities, universities, and smart cities.

The project emphasizes transparency, accountability, community participation, and modern software engineering practices.

**"Empowering citizens. Enabling authorities. Building better communities."**

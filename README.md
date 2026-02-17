# PortoSidik - Premium Portfolio CMS

A state-of-the-art portfolio website with a built-in CMS, designed for Product Designers and Fullstack Developers who demand the highest level of quality, performance, and aesthetics.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS 4 (Theme Variables, Glassmorphism)
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL with RLS)
- **Auth**: Supabase Auth
- **Forms**: React Hook Form + Zod
- **Deployment**: Vercel

## 📁 Key Directories

- `/app`: Public pages and protected dashboard routes.
- `/components`: Modular UI components (Atomic, Layout, Sections).
- `/lib`: Database clients, utility functions, and Zod schemas.
- `/services`: Abstraction layer for database operations.
- `/hooks`: Custom React hooks for auth and data fetching.

## 🛠️ Setup Instructions

### 1. Supabase Preparation

Run the following SQL in your Supabase SQL Editor to initialize the database:
[View Schema](file:///C:/Users/Lenovo/.gemini/antigravity/brain/d3d9ac76-efd0-4fa8-b1b1-161bdd22b1c0/supabase_schema.sql)

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3. Installation

```bash
npm install
```

### 4. Local Development

```bash
npm run dev
```

## 🔐 Security

- **Row Level Security (RLS)** is enabled for all tables.
- **Middleware** protects all `/dashboard` routes, redirecting unauthenticated users to `/login`.
- **Admin Access**: Ensure your user record in the `users` table has the `role` set to `'admin'`.

## 📈 Performance

- **ISR (Incremental Static Regeneration)** for project and blog lists.
- **Optimized Images** using `next/image`.
- **Zero CLS** via skeleton loading and layout stability.

---

Designed for excellence. Built with **Antigravity**.

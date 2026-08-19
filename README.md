# Aji Arlando — Fullstack Developer Portfolio 🚀

A modern, systematic web portfolio built from the ground up, highlighting technical precision and robust architecture.

🔗 **Live Demo:** [ajiarlando.my.id](https://ajiarlando.my.id)

![Banner](./screenshot.png)

## 📖 About the Project

This repository contains the source code for my personal portfolio. It is a complete architectural rebuild designed to reflect my approach to software engineering. The UI follows a strict **"Structural Honesty"** design philosophy:
- **Sharp Edges:** `0px` border-radius across all components.
- **Exposed Grid:** Backgrounds mimicking architectural blueprint grid lines.
- **No Artificial Depth:** Stripped away drop shadows in favor of flat, high-contrast, hairline borders.
- **Visual Transparency:** Emphasizing raw structure over ornamental flair.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Backend & Auth:** Supabase (PostgreSQL + Authentication + Storage)
- **Deployment:** Vercel

## ✨ Features

- **Public Facing Pages:** Home, Selected Work, About, and Contact.
- **Admin Dashboard:** A fully protected internal CMS for executing CRUD operations on portfolio projects.
- **Auth Guard:** Supabase Authentication securing all `/dashboard` and `/login` routes.
- **SEO & Performance:** Dynamic metadata injection, auto-generated `sitemap.xml` & `robots.txt`, and skeleton loading states.
- **Monitoring:** Real-time tracking via Vercel Analytics and Speed Insights.

## 📂 Project Structure

```text
src/
├── app/                  # Next.js App Router (Public routes & protected /dashboard)
├── components/           
│   ├── layout/           # Shared page wrappers (Navbar, Footer, Grid Background)
│   └── ui/               # Reusable primitive components (Button, Input, TechTag)
├── lib/                  
│   ├── supabase/         # Supabase SSR and Client initializers
│   ├── constants.ts      # Global site configuration & static data
│   └── utils.ts          # Helper utilities (class merging, slugification)
└── ...
```

## 🚀 Running Locally

To run this project on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ajiarl/portofolio-v2.git
   cd portofolio-v2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and define the following variables. *(You will need to supply your own Supabase project credentials).*
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📫 Contact

Want to collaborate, discuss technical implementations, or just say hi? 
- Reach out via the [Contact Page](https://ajiarlando.my.id/contact)
- Email: [ajiarlando127@gmail.com](mailto:ajiarlando127@gmail.com)

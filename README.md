# NextHit — Internal Analytics Platform

A polished MVP prototype for a Netflix-style internal content analytics and prediction system. Built for a Software Engineering class project.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- An existing Next.js project (or initialize fresh — see below)

### Option A: Drop into your existing Next.js project

Copy these folders/files into your project root:

```
app/              ← All pages and layout
components/       ← Sidebar navigation
data/             ← Mock data (titles.ts)
lib/              ← Role context
styles/           ← globals.css
next.config.js
tailwind.config.js
postcss.config.js
tsconfig.json
```

Then install the one extra dependency:

```bash
npm install recharts
```

Make sure your existing `package.json` already has `next`, `react`, `react-dom`, and TypeScript set up.

---

### Option B: Fresh install

```bash
npx create-next-app@14 nexthit --typescript --tailwind --app --no-src-dir --import-alias "@/*"
cd nexthit
npm install recharts
```

Then copy all the project files in, replacing the defaults.

---

### Run it

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```
nexthit/
├── app/
│   ├── page.tsx              ← Login / MFA / Role selection
│   ├── layout.tsx            ← Root layout + font imports
│   ├── ClientLayout.tsx      ← Sidebar wrapper (client component)
│   ├── dashboard/page.tsx    ← Command center home
│   ├── leaderboard/page.tsx  ← Ranked title scores
│   ├── analytics/page.tsx    ← Charts, filters, metrics table
│   ├── predictions/page.tsx  ← AI score prediction tool
│   ├── reports/page.tsx      ← Report generation + export
│   ├── search/page.tsx       ← Autocomplete title search
│   ├── alerts/page.tsx       ← Alert signal center
│   ├── demographics/page.tsx ← Age/region/genre audience data
│   ├── comparison/page.tsx   ← Side-by-side title comparison
│   └── trends/page.tsx       ← Platform-wide trend analysis
├── components/
│   └── layout/
│       └── Sidebar.tsx       ← Role-aware navigation sidebar
├── data/
│   └── titles.ts             ← 10 seeded mock Netflix-like titles
├── lib/
│   └── roleContext.tsx       ← Global role state (React Context)
├── styles/
│   └── globals.css           ← Dark theme, CSS variables, animations
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

---

## 🎭 Pages Overview

| Page | Description |
|------|-------------|
| **Login** | SSO-style login → MFA code entry → role selection |
| **Dashboard** | Central hub with stats, module cards, recent alerts |
| **Leaderboard** | Top 20 titles by current or predicted score, podium + table |
| **Analytics** | Charts (line/bar), filters by genre, metrics table, title selector |
| **AI Predictions** | Input form (genre, budget, cast, region) → score + confidence + explanation |
| **Reports** | Generate performance or prediction reports, export UI (PDF/CSV/Excel) |
| **Search** | Live autocomplete search across titles, actors, genres, IDs |
| **Alerts** | Critical/warning/watch alerts with filtering and score display |
| **Demographics** | Pie charts + bar charts for age groups, regions, genre preferences |
| **Comparison** | Side-by-side metrics + radar chart for any two titles |
| **Trends** | Multi-line weekly views chart, top performers, AI insights |

---

## 👥 Role-Based Access

| Role | Access |
|------|--------|
| **Executive** | Dashboard, Leaderboard, Reports, Alerts, Trends |
| **Analyst** | All pages |
| **Marketing** | Dashboard, Leaderboard, Analytics, Alerts, Demographics, Comparison |
| **Admin** | All pages |

---

## 📊 Mock Data

`data/titles.ts` contains 10 seeded titles including:
- Neon Requiem, Crimson Tide Protocol, The Meridian Code (critical alerts)
- Galactic Drift, Shattered Glass House (warning/watch)
- Full demographic breakdowns, weekly view trends, cast, budget, scores

---

## 🎨 Design System

- **Font**: Bebas Neue (display) + DM Sans (body) + DM Mono (numbers)
- **Colors**: `#0a0a0a` bg · `#e50914` accent · `#f5f5f1` text
- **CSS variables** in `styles/globals.css` — easy to theme
- **No Tailwind utility classes used in components** — all inline styles with CSS variables for clarity and student-readability

---

## ✅ Feature-to-Requirement Mapping

| Requirement | Implemented |
|-------------|-------------|
| Login + SSO UI | ✅ `app/page.tsx` |
| MFA Screen | ✅ `app/page.tsx` (step 2) |
| Role-based access | ✅ `lib/roleContext.tsx` + Sidebar |
| Dashboard home | ✅ `app/dashboard/page.tsx` |
| Leaderboard (Top 20) | ✅ `app/leaderboard/page.tsx` |
| Analytics charts + filters | ✅ `app/analytics/page.tsx` |
| AI Prediction tool | ✅ `app/predictions/page.tsx` |
| Reports + export UI | ✅ `app/reports/page.tsx` |
| Search + autocomplete | ✅ `app/search/page.tsx` |
| Alerts with priority | ✅ `app/alerts/page.tsx` |
| Demographics insights | ✅ `app/demographics/page.tsx` |
| Side-by-side comparison | ✅ `app/comparison/page.tsx` |
| Performance trends | ✅ `app/trends/page.tsx` |
| Mock data with real structure | ✅ `data/titles.ts` |

---

## 🛠 Tech Stack

- **Next.js 14** (App Router)
- **React 18** + TypeScript
- **Recharts** for all data visualizations
- **CSS Variables** for theming (no Tailwind in components)
- **React Context** for role state
- **No backend required** — all mock data, zero API calls

---

*Built for CS Software Engineering MVP demo. Not affiliated with Netflix.*

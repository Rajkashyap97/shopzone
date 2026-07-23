# ShopZone — Sprint 06 E-Commerce SPA

A multi-route React e-commerce storefront built with React Router (client-side routing),
Context API (global cart + mock auth), and the DummyJSON products API.

🚀 Live Demo
🔗 Website: https://shopzone-jet-seven.vercel.app/

💻 GitHub Repository
🔗 Source Code: https://github.com/Rajkashyap97/shopzone

## Features implemented

**Phase 1 — Base Routing**
- `BrowserRouter` with routes: `/`, `/shop`, `/contact`
- Dynamic route `/product/:id` with `useParams()` data hydration
- Product grid fetched live from `https://dummyjson.com/products`

**Phase 2 — Global State**
- `CartContext` (via `useReducer`) wraps the whole app
- "Add to Cart" on the product page dispatches into global state
- Persistent `Navbar` with a live cart badge that updates instantly
- `/cart` route lists items, supports qty +/-, remove, and shows the total

**Phase 3 — Auth Mocking & Protected Routes**
- Cart state synced to `localStorage` — survives a hard refresh
- `/login` route with a "Login as Guest" action
- `/checkout` is a protected route: unauthenticated users are redirected to
  `/login` and sent back to `/checkout` after logging in

## Tech stack
- React 18 + Vite
- react-router-dom v6
- Context API + useReducer (no Redux)
- Plain CSS (design tokens in `src/index.css`)

---

## What to install

You need **Node.js 18+** and **npm** installed. Check with:

```bash
node -v
npm -v
```

If you don't have Node, download it from https://nodejs.org (LTS version).

Then, from inside the project folder, install all dependencies (this reads
`package.json` and pulls in React, React Router, Vite, etc. — you don't need to
`npm install` each package separately, `react-router-dom` is already listed there):

```bash
npm install
```

## How to run it locally

```bash
npm run dev
```

This starts the Vite dev server — open the URL it prints, normally:

```
http://localhost:5173
```

Click around `/`, `/shop`, `/product/:id`, `/cart`, `/login`, `/checkout` — notice the
URL changes but the page never does a full reload.

## How to build for production

```bash
npm run build
```

Output goes to the `dist/` folder. Preview the production build locally with:

```bash
npm run preview
```

## How to deploy to Vercel

1. Push this project to a **public GitHub repo**.
2. Go to https://vercel.com → **New Project** → import that repo.
3. Framework preset: Vercel auto-detects **Vite** — leave build command as
   `npm run build` and output directory as `dist`.
4. Deploy. The included `vercel.json` already has the SPA rewrite rule, so refreshing
   on any route (e.g. `/shop` or `/product/5`) will **not** 404.

## Project structure

```
shopzone/
├── src/
│   ├── components/       # Navbar, ProductCard, ProtectedRoute
│   ├── context/           # CartContext, AuthContext
│   ├── pages/              # Home, Shop, ProductDetail, Cart, Contact, Login, Checkout, NotFound
│   ├── App.jsx             # Route definitions
│   ├── main.jsx            # Providers + BrowserRouter
│   └── index.css           # Design tokens / global styles
├── vercel.json             # SPA rewrite rule (fixes refresh 404 on Vercel)
├── Prompts.md              # AI pair-programming log (per sprint policy)
└── package.json
```

## Notes on the sprint's technical FAQ (already handled in this repo)

- **404 on refresh (Vercel):** fixed via `vercel.json` rewrite rule (included).
- **`<a>` vs `<Link>`:** all internal navigation uses `<Link>` / `<NavLink>` from
  `react-router-dom`, never a bare `<a href>`, so cart state is never lost.
- **`useEffect` firing twice locally:** that's `<StrictMode>` in `main.jsx` intentionally
  double-invoking effects in dev to surface bugs — it won't happen in the production build.
- **Duplicate cart items:** `CartContext`'s reducer checks for an existing `id` before
  deciding to increment quantity vs. push a new item.
- **Case-sensitive imports:** all imports here match file casing exactly
  (e.g. `./pages/Home` → `Home.jsx`) so the build won't break on Vercel's Linux servers.

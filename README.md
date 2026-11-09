# KapadKart admin

React 19 console for KapadKart platform admins: shops, shop users, email logs, and platform health. It does not connect to PostgreSQL. It talks to the KapadKart API.

Run the API (`kapadkart`) and apply the database seed before signing in. The shop-facing app is `kapadkart-fe`.

## Requirements

- Node.js 22 or newer
- npm 10 or newer
- KapadKart API on http://localhost:4000, with `npm run db:setup` already applied

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5174/login.

The seeded platform admin is:

| Field | Value |
|---|---|
| Email | `admin@kapadkart.com` |
| Password | `Admin123` |

The username `kapadkart` is also accepted by the API. Change this password before the database is shared.

`npm run dev` loads `.env.development`:

```env
VITE_BASE_PATH=/
VITE_API_BASE_URL=
VITE_BACKEND_URL=http://localhost:4000
```

An empty `VITE_API_BASE_URL` keeps requests on this origin. Vite proxies `/api` to the API and rewrites `/api/...` to `/api/v1/...`. It also proxies `/uploads` and `/b`.

The dev server uses port 5174 and will not fall back to another port (`strictPort`). The API must allow `http://localhost:5174` in `FRONTEND_ORIGIN` when the browser calls the API host directly. The dev proxy does not need that, because the browser stays on port 5174.

## Production build

`.env.production` leaves `VITE_API_BASE_URL` empty. The published site is HTTPS, and the API is HTTP, so the browser cannot call `http://13.234.170.148` directly. `functions/` proxies `/api`, `/uploads`, and `/images` to `http://13.234.170.148/kapadkart` and inserts `/api/v1`.

```bash
npm run deploy
```

`VITE_*` values are public in the built JavaScript. Do not put secrets here.

## Routes

| URL | Page |
|---|---|
| http://localhost:5174/login | Admin sign-in |
| http://localhost:5174/dashboard | Platform dashboard |
| http://localhost:5174/shops | Shop list |
| http://localhost:5174/shops/new | Create a shop |
| http://localhost:5174/emails | Email logs |

`/admin/...` mirrors those paths (for example `/admin/shops`).

Creating a shop here is what gives the shop app a `/t/:slug` tenant.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite on port 5174 |
| `npm run build` | Production bundle in `dist/` |
| `npm run preview` | Serve the production bundle |
| `npm run deploy` | Build and publish `dist/` to Cloudflare Pages project `kapadkart-admin` |
| `npm run lint` | oxlint |
| `npm test` | Static checks for exports, routing, and admin flows |

## Stack

React 19, React Router 7, Tailwind CSS 4, and Vite 8. The `@` alias maps to `src/`.

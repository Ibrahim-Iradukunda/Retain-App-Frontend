# Retain Frontend

Retain is a personal expense and monthly budget manager. This repository folder contains the React and TypeScript frontend; it communicates with a separately hosted backend API.

## Deployed application

**Frontend:** https://retain-app-frontend.vercel.app

The frontend is configured to send production API calls through the Vercel `/_backend` rewrite in [`vercel.json`](./vercel.json). The rewrite forwards requests to the Retain backend under `/api`.

## Features

- Create an account, sign in, and sign out. The auth context holds the current user and session token and restores them from browser storage.
- Record expenses with a title, amount, category, date, payment method, and optional notes. Update and delete expense records.
- Browse recent and paginated expense records.
- Search expenses and filter by category, payment method, date range, and amount range. Sort by date or amount.
- Set and update a monthly budget; review spending, remaining budget, budget status, highest expense, and category totals.
- Open the admin dashboard for platform insights and create, update, or delete expense categories. Admin visibility is role-gated in the frontend; the backend must enforce admin authorization as well.
- Use the responsive layout on desktop, tablet, and mobile-sized screens.

## Technology

- React
- TypeScript
- Vite
- Redux Toolkit and React Redux for expense search, filter, and sort state
- React Context for authentication state and role checks
- Lucide React icons

## Local setup

Requirements: Node.js and npm.

```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Vite prints the local development URL after startup. The example environment file sets `VITE_API_URL=http://localhost:4000/api`; change it if your backend uses a different local URL.

To type-check and create a production build:

```powershell
npm run build
```

To preview the production build locally:

```powershell
npm run preview
```

## Frontend structure

- `src/App.tsx` contains the expense, budget, dashboard, auth form, and admin UI flows.
- `src/AuthContext.tsx` provides sign-in, sign-out, user, and token state to the app.
- `src/store.ts` defines the Redux slice for expense search, filtering, and sorting.
- `src/api.ts` provides the shared API client, bearer-token header, API types, and formatting helpers.
- `src/main.tsx` mounts the Redux and auth providers.

The shared API client attaches the saved session JWT as a bearer authorization header. In production, the client uses `/_backend`; in development it uses `VITE_API_URL`.

## Backend API expected by the frontend

The separately deployed backend should provide the endpoints consumed by the frontend:

- `POST /api/auth/signup` and `POST /api/auth/signin`
- `GET /api/categories`; category creation, update, and deletion
- `GET /api/dashboard` with `year` and `month` query parameters
- `GET /api/expenses` with pagination, search, filters, and sorting; expense create, update, and delete operations
- `PUT /api/budgets` to save a monthly budget
- `GET /api/admin/insights` for admin-only platform statistics

Protected endpoints must verify the bearer token and enforce ownership and admin authorization on the server. Frontend role checks are for the user interface and are not a substitute for backend authorization.

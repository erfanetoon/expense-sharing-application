# Expense Sharing

A small full-stack app for recording expenses between people and reading the net balance, in the spirit of Splitwise.

Users are seeded. There is no login, registration, or user creation.

An expense is one directional payment. If Alice paid and the expense is for Bob, Bob owes Alice that amount. Expenses between the same two people are combined on the Balances view, so opposite payments reduce each other instead of appearing as two debts.

## Repository layout

```
expense-sharing-application/
├── backend/core/          # NestJS API, SQLite entities, migrations, and Zod contracts
├── frontend/web/          # Vite + React page, UI, API hooks, and copy
└── package.json           # pnpm + Turborepo
```

## Tech stack

| Layer    | Stack                                              |
| -------- | -------------------------------------------------- |
| Monorepo | pnpm workspaces + Turborepo                        |
| API      | NestJS 11, Fastify, MikroORM 7, SQLite             |
| Web      | Vite, React 19, MUI, TanStack Query                |
| Language | TypeScript, Node.js 22+                            |

## Prerequisites

- Node.js 22 or newer
- pnpm 9 (`corepack enable` is enough)

SQLite is stored in a local file. PostgreSQL and Redis are not required.

## Setup

From the repository root:

```bash
pnpm install

cp backend/core/.env.sample backend/core/.env
cp frontend/web/.env.sample frontend/web/.env
```

On Windows PowerShell, use `Copy-Item` instead of `cp`.

Create the database if this is a fresh checkout, apply migrations, and seed Alice, Bob, Charlie, and David plus a few sample expenses:

```bash
pnpm migrate
```

Start the API and the web app:

```bash
pnpm dev
```

| App                         | URL                          |
| --------------------------- | ---------------------------- |
| Web                         | http://localhost:4001        |
| API                         | http://localhost:4000        |
| Swagger                     | http://localhost:4000/swagger |

The API also creates the schema and seed on startup when the database is empty, so `pnpm dev` is enough after the env files exist. `pnpm migrate` is the explicit setup step.

## Using the app

The page has two views:

- **Expenses** lists who paid, who the expense was for, the amount, the description, and the date.
- **Balances** lists the net amount between each pair, for example `Alice owes Bob $120.00`.

**Add Expense** opens a dialog with Paid by, Expense for, Amount, and Description. The date is set when the expense is saved.

## API

| Method | Path            | Purpose                                      |
| ------ | --------------- | -------------------------------------------- |
| GET    | `/v1/users`     | Seeded people                                |
| GET    | `/v1/expenses`  | Expense list                                 |
| POST   | `/v1/expenses`  | Create an expense. `amount` is integer cents |
| GET    | `/v1/balances`  | Netted balances                              |

## Scripts

```bash
pnpm dev                 # API and web app
pnpm build               # production build
pnpm migrate             # apply migrations and seed
pnpm lint                # biome check
```

## Deployment

The production image serves the built web app and the API from one process, and keeps the SQLite file on a volume.

```bash
docker compose up --build
```

The app listens on port 4000. Set `APP_ALLOWED_HOSTS` if the browser is on another origin.

A public URL depends on where you host this image (a VPS, Fly.io, Render, Railway, or similar). This repository does not include a live deployment.

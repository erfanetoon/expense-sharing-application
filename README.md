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

## Production

Node.js 22 and pnpm 9 are required. Nginx serves the built page from `frontend/web/dist`. PM2 runs the API, and Nginx proxies `/v1` and `/swagger` to that process.

From the repository root on the server (`/var/www/expense.erfanetoon.ir`):

```bash
corepack enable
corepack prepare pnpm@9.0.0 --activate
pnpm install

cp backend/core/.env.sample backend/core/.env
printf 'VITE_PORT=4001\nVITE_API_BASE_URL=\n' > frontend/web/.env
```

`VITE_API_BASE_URL` must be empty before the frontend build. The browser then calls the same domain, and Nginx forwards those calls to the API.

In `backend/core/.env`:

```bash
APP_ENV=production
APP_PORT=4000
APP_BASE_URL=http://expense.erfanetoon.ir
APP_ALLOWED_HOSTS=http://expense.erfanetoon.ir
APP_NAME=Expense Sharing
LOG_LEVEL=info
DB_FILE=./data/expense-sharing.sqlite
MIGRATIONS_PATH=./src/database/migrations
DB_DEBUG=false
```

Build both apps, create the database, and start the API with PM2 from `backend/core` so the SQLite path resolves there:

```bash
pnpm --filter @frontend/web build
pnpm --filter @backend/core build
pnpm migrate

cd backend/core
pm2 start dist/main.js --name expense-sharing
pm2 save
```

Nginx site `/etc/nginx/sites-available/expense.erfanetoon.ir`:

```nginx
server {
    listen 80;
    server_name expense.erfanetoon.ir;

    root /var/www/expense.erfanetoon.ir/frontend/web/dist;
    index index.html;

    location /v1/ {
        proxy_pass http://127.0.0.1:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /swagger {
        proxy_pass http://127.0.0.1:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Enable it and reload:

```bash
sudo ln -sfn /etc/nginx/sites-available/expense.erfanetoon.ir /etc/nginx/sites-enabled/expense.erfanetoon.ir
sudo nginx -t && sudo systemctl reload nginx
```

`http://expense.erfanetoon.ir` is the page. `http://expense.erfanetoon.ir/v1/...` is the API. `http://expense.erfanetoon.ir/swagger` is the API docs.

FROM node:22-bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/* \
    && corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY backend/core/package.json backend/core/package.json
COPY frontend/web/package.json frontend/web/package.json
COPY packages/translation/package.json packages/translation/package.json

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm --filter @frontend/web build && pnpm --filter @backend/core build

ENV APP_ENV=production \
    APP_PORT=4000 \
    APP_ALLOWED_HOSTS= \
    DB_FILE=/app/data/expense-sharing.sqlite \
    MIGRATIONS_PATH=/app/backend/core/src/database/migrations \
    FRONTEND_DIST=/app/frontend/web/dist \
    NODE_ENV=production

EXPOSE 4000

CMD ["node", "backend/core/dist/main.js"]

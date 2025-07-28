FROM node:20-alpine

WORKDIR /usr/src/app

# here we're passing a default DATABASE_URL, on dev mode providing this build-arg won't be necessary, assuming the database is already running. (we getting what I mean here, right?)
ARG DATABASE_URL=postgres://postgres:password@localhost:5432/postgres

COPY ./packages ./packages

COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml

COPY ./apps/web/package.json ./apps/web/package.json

RUN npm install -g pnpm

RUN pnpm install
RUN pnpm prisma:generate

COPY ./apps/web/ ./apps/web/

RUN pnpm run build:prisma
RUN DATABASE_URL=${DATABASE_URL} pnpm run build:web

EXPOSE 3000

CMD ["pnpm", "start:web"]

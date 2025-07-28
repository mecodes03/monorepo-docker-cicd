FROM node:20-alpine

WORKDIR /usr/src/app

COPY ./packages ./packages

COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml

COPY ./apps/http/package.json ./apps/http/package.json

RUN npm install -g pnpm

RUN pnpm install
RUN pnpm prisma:generate

COPY ./apps/http/ ./apps/http/

RUN pnpm run build:prisma
RUN pnpm run build:http

CMD ["pnpm", "start:http"]

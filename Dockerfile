FROM node:26-alpine AS base
# Node 25 以降は corepack が同梱されないため npm でグローバルに入れる
RUN npm install -g pnpm@10.34.9

FROM base AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN pnpm install --frozen-lockfile

FROM base AS production-dependencies-env
COPY ./package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm install --frozen-lockfile --prod

FROM base AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN --mount=type=secret,id=blob_token,required=true BLOB_READ_WRITE_TOKEN="$(cat /run/secrets/blob_token)" pnpm run build

FROM base
COPY ./package.json pnpm-lock.yaml /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["pnpm", "run", "start"]

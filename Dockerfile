# syntax=docker/dockerfile:1
FROM node:26-alpine AS base
# Node 25 以降は corepack が同梱されないため npm でグローバルに入れる
RUN npm install -g pnpm@10.34.9

FROM base AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN pnpm install --frozen-lockfile

FROM base AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN --mount=type=secret,id=blob_token,required=true BLOB_READ_WRITE_TOKEN="$(cat /run/secrets/blob_token)" pnpm run build

# SPA なので Node は配信に不要。ビルド結果の静的ファイルを nginx で返す
FROM nginx:alpine
COPY --from=build-env /app/build/client /usr/share/nginx/html
# 存在しないパスは index.html を返し、ルーティングはクライアントの React Router に任せる
# ファイル名にハッシュが付く /assets/ は長期キャッシュし、index.html は毎回検証させて新しいデプロイを確実に読み込ませる
RUN cat > /etc/nginx/conf.d/default.conf <<'NGINX'
server {
  listen 80;
  root /usr/share/nginx/html;
  gzip on;
  gzip_types text/css application/javascript image/svg+xml application/manifest+json;

  location /assets/ {
    add_header Cache-Control "public, max-age=31536000, immutable";
    try_files $uri =404;
  }

  location / {
    add_header Cache-Control "no-cache";
    try_files $uri /index.html;
  }
}
NGINX

FROM node:lts as builder

ENV HUSKY_SKIP_INSTALL=true

RUN npm install -g pnpm

WORKDIR /build

COPY ./package.json ./
COPY ./pnpm-*.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:lts

LABEL org.opencontainers.image.source=https://github.com/lab-ops/auth
LABEL org.opencontainers.image.description="Lab Ops Auth Service"
LABEL org.opencontainers.image.licenses="GNU GPLv3"
LABEL org.opencontainers.image.authors="Lab Ops <support@lab-ops.cloud>"

RUN npm install -g pnpm && \
    mkdir -pv /app && \
    chown -R node:node /app

WORKDIR /app

COPY --from=builder --chown=node:node /build/package.json ./
COPY --from=builder --chown=node:node /build/pnpm-*.yaml ./

RUN pnpm install --prod --ignore-scripts

COPY --from=builder --chown=node:node /build/dist ./dist

USER node

ENTRYPOINT [ "pnpm", "run", "start" ]

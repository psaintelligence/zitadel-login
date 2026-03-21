# ==========================================
# Stage 1: Builder
# ==========================================
FROM node:22-bookworm-slim AS builder

RUN apt-get update && apt-get install -y git
WORKDIR /app

RUN corepack enable
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm config set store-dir /pnpm/store

COPY . .

RUN \
    --mount=type=cache,id=pnpm-store,target=/pnpm/store pnpm install && \
    cp custom/custom-theme.env apps/login/.env.production && \
    cat custom/custom.scss >> apps/login/src/styles/globals.scss && \
    pnpm --filter @zitadel/proto generate && \
    pnpm --filter @zitadel/login... build

# ==========================================
# Stage 2: Runner
# ==========================================
FROM node:22-bookworm-slim AS runner
WORKDIR /app

RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs nextjs

RUN mkdir -p /.env-file && touch /.env-file/.env && chown -R nextjs:nodejs /.env-file

# Copy the standalone build
# (Zitadel's custom build script automatically bundles public/, entrypoint.sh, and healthcheck.mjs into this folder!)
COPY --from=builder --chown=nextjs:nodejs /app/apps/login/.next/standalone ./

# Next.js standalone does NOT bundle the static build files, so we still must copy those manually
COPY --from=builder --chown=nextjs:nodejs /app/apps/login/.next/static ./apps/login/.next/static

# The entrypoint.sh file was brought over by the standalone copy above, just make it executable
RUN chmod +x /app/entrypoint.sh

USER nextjs

ENV HOSTNAME="::" \
    PORT="3000" \
    NODE_ENV="production" \
    NODE_OPTIONS="--use-openssl-ca" \
    SSL_CERT_FILE="/etc/ssl/certs/ca-certificates.crt" \
    SSL_CERT_DIR="/etc/ssl/certs" \
    ZITADEL_TLS_ENABLED="false" \
    OTEL_SERVICE_NAME="zitadel-login" \
    OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD ["/usr/local/bin/node", "/app/healthcheck.mjs", "/ui/v2/login/ready"]

ENTRYPOINT ["/app/entrypoint.sh", "node", "apps/login/server.js"]

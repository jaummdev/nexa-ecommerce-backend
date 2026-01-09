# Stage 1: Build
FROM node:20-alpine AS builder

# Instalar pnpm globalmente
RUN corepack enable && corepack prepare pnpm@10.26.2 --activate

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/
COPY tsconfig.json ./

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar código fonte
COPY src ./src
COPY lib ./lib

# Gerar Prisma Client
RUN pnpm prisma generate

# Build do TypeScript
RUN pnpm build

# Stage 2: Production
FROM node:20-alpine AS runner

# Instalar pnpm globalmente
RUN corepack enable && corepack prepare pnpm@10.26.2 --activate

# Instalar Prisma CLI globalmente para migrations (usando npm para instalação global)
RUN npm install -g prisma@7.2.0

WORKDIR /app

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Copiar arquivos necessários do builder
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/generated ./generated
COPY --from=builder --chown=nodejs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./

# Mudar para usuário não-root
USER nodejs

# Expor porta (Coolify pode sobrescrever isso)
EXPOSE 3333

# Variável de ambiente para o Prisma
ENV NODE_ENV=production

# Healthcheck para o Coolify
# O Coolify pode configurar seu próprio healthcheck, mas este é um fallback
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD node -e "const http=require('http');const p=process.env.PORT||3333;http.get(`http://localhost:${p}/`,r=>process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))"

# Comando padrão (pode ser sobrescrito no Coolify)
# Use "start:migrate" se quiser rodar migrations automaticamente
# Ou rode migrations manualmente: prisma migrate deploy
CMD ["pnpm", "start"]

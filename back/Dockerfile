# ============================================
# Stage de base
# ============================================
FROM node:22-alpine AS base

# Installation des dépendances système pour PostgreSQL
RUN apk add --no-cache \
    postgresql-client \
    curl

WORKDIR /app

# ============================================
# Stage développement
# ============================================
FROM base AS dev

# Copier les fichiers de dépendances
COPY back/package*.json ./

# Installer toutes les dépendances (y compris dev)
RUN npm ci

# Copier le code source
COPY back/ .

# Variables d'environnement par défaut (à surcharger via .env ou docker-compose)
ENV NODE_ENV=development
ENV PORT=3000

EXPOSE 3000

# Nodemon pour le hot-reload en dev
CMD ["npm", "run", "dev"]

# ============================================
# Stage production
# ============================================
FROM base AS prod

# Variables d'environnement production
ENV NODE_ENV=production
ENV PORT=3000

# Copier les fichiers de dépendances
COPY back/package*.json ./

# Installer uniquement les dépendances de production
RUN npm ci --only=production --ignore-scripts

# Copier le code source
COPY back/ .

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

# Permissions
RUN mkdir -p /app/logs && \
    chown -R nodejs:nodejs /app/logs && \
    chmod -R 755 /app/logs

# Passer à l'utilisateur non-root
USER nodejs

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Démarrage de l'application
CMD ["npm", "start"]
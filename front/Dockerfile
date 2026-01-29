# ===== Étape 1 : Build =====
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ===== Étape 2 : Serveur Nginx =====
FROM nginx:alpine

# Supprime la config par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Ajoute ta config Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie le build Vite
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

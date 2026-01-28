FROM node:20-alpine

WORKDIR /app

# Installation des dépendances
COPY package*.json ./
RUN npm install

# Copie du code source
COPY . .

EXPOSE 5173

# Mode développement avec hot-reload (ajout --host pour Docker)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

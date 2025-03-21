# frontend/Dockerfile
FROM node:18-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers et installer les dépendances
COPY package.json ./
RUN npm install

# Copier le code source
COPY . .

# Construire l'application React
RUN npm run build

# Utiliser un serveur nginx pour servir l'application
FROM nginx:alpine AS prod

COPY --from=build /app/default.conf /etc/nginx/conf.d
COPY --from=build /app/dist /usr/share/nginx/html

# backend/Dockerfile
FROM node:18

# Définir les arguments pour le build
ARG BACKEND_PORT

# Répertoire de travail
WORKDIR /src/app

# Copier les fichiers et installer les dépendances
COPY package.json ./
RUN npm install

# Copier le code source
COPY . .
RUN npm run build

# Définir l'environnement
ENV PORT=${BACKEND_PORT}

# Exposer le port
EXPOSE ${BACKEND_PORT}

# Commande de démarrage
CMD [ "npm", "run", "start" ]
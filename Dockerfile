# Étape 1 : build de l'app React avec Vite
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Étape 2 : nginx pour servir le build
FROM nginx:alpine

# Copie les fichiers compilés (dist) dans le dossier public nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copie la conf custom pour gérer les routes React
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
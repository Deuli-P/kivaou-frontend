# Étape 1 : build de l'app React avec Vite
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : nginx pour servir le build + override ENTRYPOINT
FROM nginx:alpine

# Copie du build et de la conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie et préparation de votre entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh \
    && apk add --no-cache dos2unix \
    && dos2unix /entrypoint.sh

# On force l'utilisation de VOTRE entrypoint
ENTRYPOINT ["/entrypoint.sh"]

# Le CMD par défaut après votre script
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80 443
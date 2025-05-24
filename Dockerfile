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

EXPOSE 80 443

# Le CMD par défaut après votre script
CMD ["nginx", "-g", "daemon off;"]

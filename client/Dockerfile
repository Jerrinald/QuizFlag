# Étape 1 — Build
FROM node:alpine AS builder
WORKDIR /srv/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Étape 2 — Serve avec nginx
FROM nginx:alpine
COPY --from=builder /srv/app/dist /usr/share/nginx/html
EXPOSE 80
# Build aşaması
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production aşaması
FROM node:16-alpine

WORKDIR /app
COPY package*.json ./
ENV PORT=4000
ENV NODE_ENV=production
RUN npm install --frozen-lockfile --only=production
COPY --from=builder /app/dist ./dist
EXPOSE ${PORT}

CMD ["npm", "run", "start"]

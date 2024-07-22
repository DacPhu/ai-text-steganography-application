# Backend
FROM node:14-alpine AS backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend .
RUN npm run dev

# Frontend
FROM node:14-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run dev

# PostgreSQL
FROM postgres:15 AS postgresql
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_DB=mydatabase

# Final image
FROM node:14-alpine
WORKDIR /app
COPY --from=backend /app/backend/dist ./backend
COPY --from=frontend /app/frontend/build ./frontend/build
COPY --from=postgresql /docker-entrypoint-initdb.d /docker-entrypoint-initdb.d

# Install PM2 to manage multiple processes
RUN npm install -g pm2

# Copy PM2 ecosystem config
COPY ecosystem.config.ts .

EXPOSE 3001 5173

CMD ["pm2-runtime", "start", "ecosystem.config.ts"]

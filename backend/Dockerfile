# Use Node 20 Alpine
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Generate Prisma client BEFORE building TypeScript
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Expose backend port
EXPOSE 4000

# Run migrations, seed, and start server in one command
CMD sh -c "\
  echo 'Running migrations...' && \
  npx prisma migrate deploy && \
  echo 'Seeding database...' && \
  if [ -f ./prisma/seed.ts ] || [ -f ./prisma/seed.js ]; then \
    npm run seed; \
  else \
    echo 'No seed script found, skipping...'; \
  fi && \
  echo 'Starting server...' && \
  npm start \
"

# Use Node 20
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Build Next.js
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]

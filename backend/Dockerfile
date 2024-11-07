# Dockerfile for Backend
FROM node:14-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port for the backend (assuming it runs on port 5000)
EXPOSE 5000

# Start the server
CMD ["node", "src/index.js"]

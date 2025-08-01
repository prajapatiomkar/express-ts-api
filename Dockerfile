# Use official Node base image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json (for better cache utilization)
COPY package*.json ./

# Install node dependencies
RUN npm i

# Copy the rest of your source code
COPY . .

# Build TypeScript app
RUN npm run build

# Expose the app port (adjust if your API uses another)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Build the NestJS application
RUN npm run build

# Expose port 3000 to be accessible from the outside
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "run", "start:dev"]

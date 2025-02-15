# Use a Node.js base image 
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . . 


# Expose the port your application listens on
EXPOSE 3001


# Start the application
CMD ["node", "app.js"]


# docker build -t webapp -f Dockerfile1 .
# 
# docker run --env-file .env -p 3001:3001 webapp
# Stage 1: Build the React application
FROM node:16-alpine as build-stage

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the build using Nginx
FROM nginx:alpine

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build from the previous stage
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]

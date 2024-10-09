# Step 1: Build the app using Node.js
FROM node:lts-alpine AS build

ARG API_ADDRESS

ENV API_ADDRESS=${API_ADDRESS}

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the built app files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port Nginx will serve on
EXPOSE 80

# Run Nginx in the foreground (prevent daemon mode)
CMD ["nginx", "-g", "daemon off;"]
# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY ./ /app/

# Install all the dependencies
RUN npm install -g npm@7.24.1
RUN npm config set strict-ssl false
RUN npm config set registry http://registry.npmjs.org/

RUN npm install

# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/sd2376-workshop /usr/share/nginx/html

# Expose port 80
EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]
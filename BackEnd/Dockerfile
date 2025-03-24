# Base image
FROM node:21

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies, force rebuild of native modules
RUN npm install --build-from-source

# Bundle app source
COPY . .

# Copy the .env file
COPY .env ./

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3002

# Start the server using the production build
CMD ["npm", "run", "start:prod"]
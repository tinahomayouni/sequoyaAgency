# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /etc/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose the port that your Nest.js application will run on
EXPOSE 3000
# create images finish build

# Define the command to run your application
CMD ["npm", "start"]

# Health check (optional but recommended)
HEALTHCHECK --interval=30s CMD curl -f http://localhost:3000 || exit 1

FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Installing Dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

# Copy the entire monorepo into the container
COPY . .
RUN pnpm install

# Expose ports for both applications
EXPOSE 3000

# Command to start both services
CMD ["pnpm", "run", "dev:docker"]

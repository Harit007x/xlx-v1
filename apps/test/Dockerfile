FROM node:20-alpine

# Enable Corepack
# RUN corepack enable

# Prepare the specified version of Yarn
# RUN corepack prepare npm@9.5.1 --activate

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the entire monorepo into the container
COPY . .

RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Generate Prisma client
# RUN cd packages/xlx-db && ls -la && pnpx prisma generate

# Expose ports for both applications
EXPOSE 8000

WORKDIR /usr/src/app

# Command to start both services
CMD ["pnpm", "run", "dev:test"]

FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Install Python and build dependencies
RUN apt-get update && \
    apt-get install -y python3 g++ make && \
    ln -s /usr/bin/python3 /usr/bin/python

# Set Python environment variable
ENV PYTHON=/usr/bin/python3

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy the entire monorepo into the container
COPY . .
RUN pnpm install


# Expose port
EXPOSE 3000

# Command to start the services
CMD ["pnpm", "run", "dev:docker"]

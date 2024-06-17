

1. docker network create web_network

2. COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build

3. docker-compose -f docker-compose.yml up
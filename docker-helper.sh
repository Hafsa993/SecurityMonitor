#!/bin/bash
# Helper script for common Docker commands
# Usage: ./docker-helper.sh [command]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

IMAGE_NAME="privacy-tracker"
IMAGE_TAG="${1:-1.0}"
CONTAINER_NAME="privacy-tracker-app"

print_help() {
  echo "Privacy Tracker Docker Helper"
  echo ""
  echo "Usage: ./docker-helper.sh [command] [options]"
  echo ""
  echo "Commands:"
  echo "  build              Build production image"
  echo "  build-dev          Build development image"
  echo "  run                Run production container"
  echo "  run-dev            Run development container with hot reload"
  echo "  stop               Stop running container"
  echo "  logs               Show container logs (real-time)"
  echo "  logs-tail          Show last 50 log lines"
  echo "  clean              Remove container and image"
  echo "  push [username]    Push to Docker Hub"
  echo "  save [filename]    Save image to tar file"
  echo "  load [filename]    Load image from tar file"
  echo "  shell              Open shell in running container"
  echo "  test               Run tests in container"
  echo "  compose-up         Use docker-compose up"
  echo "  compose-down       Use docker-compose down"
  echo "  ps                 List running containers"
  echo "  help               Show this help message"
  echo ""
  echo "Examples:"
  echo "  ./docker-helper.sh build"
  echo "  ./docker-helper.sh build-dev"
  echo "  ./docker-helper.sh run"
  echo "  ./docker-helper.sh push yourusername"
  echo "  ./docker-helper.sh save privacy-tracker.tar"
}

build() {
  echo -e "${YELLOW}Building production image: ${IMAGE_NAME}:${IMAGE_TAG}${NC}"
  docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
  echo -e "${GREEN}✓ Build complete!${NC}"
  echo "Run with: docker run -p 3000:3000 ${IMAGE_NAME}:${IMAGE_TAG}"
}

build_dev() {
  echo -e "${YELLOW}Building development image: ${IMAGE_NAME}:dev${NC}"
  docker build -f Dockerfile.dev -t ${IMAGE_NAME}:dev .
  echo -e "${GREEN}✓ Build complete!${NC}"
}

run_prod() {
  echo -e "${YELLOW}Starting production container...${NC}"
  docker run -p 3000:3000 --name ${CONTAINER_NAME} ${IMAGE_NAME}:${IMAGE_TAG}
  echo -e "${GREEN}✓ App running at http://localhost:3000${NC}"
}

run_dev() {
  echo -e "${YELLOW}Starting development container with hot reload...${NC}"
  docker-compose -f docker-compose.dev.yml up
}

stop_container() {
  echo -e "${YELLOW}Stopping container...${NC}"
  docker stop ${CONTAINER_NAME} 2>/dev/null || echo "Container not running"
  docker rm ${CONTAINER_NAME} 2>/dev/null || echo "Container not found"
  echo -e "${GREEN}✓ Container stopped${NC}"
}

show_logs() {
  docker logs -f ${CONTAINER_NAME}
}

show_logs_tail() {
  docker logs --tail 50 ${CONTAINER_NAME}
}

clean() {
  echo -e "${RED}Removing container and image...${NC}"
  docker stop ${CONTAINER_NAME} 2>/dev/null || true
  docker rm ${CONTAINER_NAME} 2>/dev/null || true
  docker rmi ${IMAGE_NAME}:${IMAGE_TAG} 2>/dev/null || true
  echo -e "${GREEN}✓ Cleanup complete${NC}"
}

push_hub() {
  if [ -z "$1" ]; then
    echo -e "${RED}Error: Docker Hub username required${NC}"
    echo "Usage: ./docker-helper.sh push yourusername"
    exit 1
  fi
  
  echo -e "${YELLOW}Pushing to Docker Hub...${NC}"
  docker login
  docker tag ${IMAGE_NAME}:${IMAGE_TAG} $1/${IMAGE_NAME}:${IMAGE_TAG}
  docker push $1/${IMAGE_NAME}:${IMAGE_TAG}
  echo -e "${GREEN}✓ Image pushed to $1/${IMAGE_NAME}:${IMAGE_TAG}${NC}"
}

save_image() {
  local filename="${1:-${IMAGE_NAME}.tar}"
  echo -e "${YELLOW}Saving image to ${filename}...${NC}"
  docker save ${IMAGE_NAME}:${IMAGE_TAG} -o ${filename}
  echo -e "${GREEN}✓ Image saved to ${filename}${NC}"
  echo "Transfer and load with: docker load -i ${filename}"
}

load_image() {
  if [ -z "$1" ]; then
    echo -e "${RED}Error: Filename required${NC}"
    echo "Usage: ./docker-helper.sh load [filename]"
    exit 1
  fi
  
  echo -e "${YELLOW}Loading image from $1...${NC}"
  docker load -i $1
  echo -e "${GREEN}✓ Image loaded${NC}"
}

open_shell() {
  docker exec -it ${CONTAINER_NAME} /bin/sh
}

run_tests() {
  echo -e "${YELLOW}Running tests in container...${NC}"
  docker exec ${CONTAINER_NAME} npm test
}

compose_up() {
  echo -e "${YELLOW}Starting with docker-compose...${NC}"
  docker-compose up --build
}

compose_down() {
  echo -e "${YELLOW}Stopping with docker-compose...${NC}"
  docker-compose down
}

list_containers() {
  docker ps -a
}

# Main command handling
case "$1" in
  build)
    build
    ;;
  build-dev)
    build_dev
    ;;
  run)
    run_prod
    ;;
  run-dev)
    run_dev
    ;;
  stop)
    stop_container
    ;;
  logs)
    show_logs
    ;;
  logs-tail)
    show_logs_tail
    ;;
  clean)
    clean
    ;;
  push)
    push_hub "$2"
    ;;
  save)
    save_image "$2"
    ;;
  load)
    load_image "$2"
    ;;
  shell)
    open_shell
    ;;
  test)
    run_tests
    ;;
  compose-up)
    compose_up
    ;;
  compose-down)
    compose_down
    ;;
  ps)
    list_containers
    ;;
  help|"")
    print_help
    ;;
  *)
    echo -e "${RED}Unknown command: $1${NC}"
    print_help
    exit 1
    ;;
esac

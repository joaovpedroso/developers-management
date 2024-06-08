API_CONTAINER_NAME = "developers-app"
FRONT_CONTAINER_NAME = "developers-frontend-app"

build:
	@docker-compose --build

build-up:
	@docker-compose up --build

up:
	@docker-compose up -d

down:
	@docker-compose down

down-volume:
	@docker-compose down -v

fe-bash:
	@docker exec -it $(FRONT_CONTAINER_NAME) sh

api-bash:
	@docker exec -it $(API_CONTAINER_NAME) sh

fe-test:
	@docker exec -it developers-frontend-app yarn test
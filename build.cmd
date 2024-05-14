docker rmi chat-server:local -f
docker build -f Dockerfile_local . -t chat-server:local
docker-compose up -d
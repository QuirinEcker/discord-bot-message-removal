cp ./package.json ./docker/docker-develop/node/package.json
cp ./package-lock.json ./docker/docker-develop/node/package-lock.json

cd docker/docker-develop/
docker-compose up -d --build
rm node/package.json
rm node/package-lock.json
cd ..
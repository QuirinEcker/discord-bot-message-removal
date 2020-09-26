FROM node:lts-alpine3.9
WORKDIR /usr/src/app
CMD ["node", "./dist/index"]
COPY package*.json ./
RUN npm install --save-prod
COPY . .
RUN npm run tsc


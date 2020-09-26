FROM node:10
WORKDIR /usr/src/app
CMD ["node", "./dist/index"]
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run tsc-compile


FROM node:10
RUN ls
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g nodemon && npm install discord.js && npm install
COPY ../.. .

CMD ["nodemon", "./scripts/index.js"]

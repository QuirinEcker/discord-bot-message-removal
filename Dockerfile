FROM node:10
WORKDIR /usr/src/app
COPY . .
RUN ls;
RUN npm install
CMD ["npm", "run", "app"]

FROM node:10
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run tsc-compile
CMD ["node", "./dist/index"]

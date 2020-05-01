FROM node:10
COPY . .
RUN npm install && npm run tsc-compile
CMD ["npm", "run", "tsc-run"]
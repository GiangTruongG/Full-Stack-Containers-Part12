FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

ENV DEBUG=todo-backend:*
CMD npm start

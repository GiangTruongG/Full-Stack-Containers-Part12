FROM node:16 AS build

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api/todos

RUN CI=true npm test

RUN npm run build

RUN npm install -g serve
CMD ["serve", "build"]


# Stage 2: including test
FROM nginx:alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

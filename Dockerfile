#Primera Etapa
FROM node:16-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build-step /app/dist/w2m-test /usr/share/nginx/html

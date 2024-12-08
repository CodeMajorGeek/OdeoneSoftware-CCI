FROM node:lts-bullseye
WORKDIR /usr/app/json-server

RUN npm install json-server

EXPOSE 8080

CMD ["npx", "json-server", "-p", "8080", "db.json"]
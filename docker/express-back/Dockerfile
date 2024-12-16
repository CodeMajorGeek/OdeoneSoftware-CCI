FROM node:lts-bullseye
WORKDIR /usr/app/express-back

RUN npm install express
RUN npm install sequelize
RUN npm install pg
RUN npm install nodemon --dev

EXPOSE 9999

CMD ["npm", "start"]
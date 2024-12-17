FROM node:lts-bullseye
WORKDIR /usr/app/react-front

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

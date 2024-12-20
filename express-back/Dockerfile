FROM node:lts-bullseye
WORKDIR /usr/app/express-back

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 9999

CMD ["npm", "run", "dev"]

FROM node:lts-bullseye
WORKDIR /usr/app/react-front
RUN npm i --save @fortawesome/fontawesome-svg-core
RUN npm install --save @fortawesome/free-solid-svg-icons
RUN npm install --save @fortawesome/react-fontawesome
RUN npm install react-scripts -g

COPY . /usr/app/react-front/
RUN npm install --quiet

EXPOSE 3000

CMD ["npm", "start"]

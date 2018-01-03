FROM node:8.9.3-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json package.json
RUN npm install

COPY . .

CMD npm start

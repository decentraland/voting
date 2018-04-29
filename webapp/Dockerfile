FROM node:8.9.3

RUN mkdir /app
WORKDIR /app
COPY package.json package.json
RUN npm install

COPY . .

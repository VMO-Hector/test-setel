FROM node:14.7-alpine 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm cache verify

RUN rm -rf dist/

RUN npm run build

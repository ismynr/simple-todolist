FROM node:lts-slim

WORKDIR /app

ENV MYSQL_HOST=localhost
ENV MYSQL_PORT=3306
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=
ENV MYSQL_DBNAME=todolist

COPY package*.json ./

RUN npm install

RUN npm ci

COPY . ./

EXPOSE 3030

CMD ["npm","start"]
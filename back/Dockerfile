FROM node:10.20.0-buster

WORKDIR /app/

COPY package*.json ./
RUN npm install

COPY . .
RUN rm .env

EXPOSE 3030
CMD [ "npm", "start" ]

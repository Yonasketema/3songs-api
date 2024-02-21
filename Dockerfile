 FROM node:20.11.1-alpine3.18
 WORKDIR /3songs-api
 COPY package*.json .
 RUN npm i 
 COPY . .
 ENV key=value
 EXPOSE 8000
 CMD [ "npm","start" ]
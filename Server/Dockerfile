FROM node:16.10.0

WORKDIR /

COPY package*.json ./

RUN npm install

RUN npm install -g ts-node typescript

COPY . .

ENV PORT=8081

EXPOSE 8081

EXPOSE 8080/udp

CMD [ "npm", "run", "server" ]
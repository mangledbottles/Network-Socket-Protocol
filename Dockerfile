FROM node:16.10.0

WORKDIR /

COPY package*.json ./

RUN npm install

# Install Typescript dependecies
RUN npm install -g ts-node typescript

COPY . .

ENV PORT=8081

# HTTP Server Port
EXPOSE 8081

# UDP Datagram Server Port
EXPOSE 8080/udp

# Start Broker Server
CMD [ "npm", "run", "server" ]
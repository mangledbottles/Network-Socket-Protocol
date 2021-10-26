# UDP Network Socket Protocol

## Installation
```
git clone https://github.com/mangledbottles/Network-Socket-Protocol.git
cd Network-Socket-Protocol
npm i
```
## Usage

### Server
There can only be one server
```
npm run server
```

### Dockerizing Server
Build an image from a Dockerfile and run in a new container
```docker
docker build .
docker run -i -p 8080:8080/udp [IMAGE_ID]
```
- -i parameter allows the user to **work with IO inside the Docker container** for Server Broadcasting
- -p parameter exposes the port 8080 for UDP use (see [Dockerfile](./Dockerfile))
- [IMAGE_ID] is the build ID that is run in the second command

### Client
There can be many clients
```
npm run client
```

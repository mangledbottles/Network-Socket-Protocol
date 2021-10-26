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

> 
> ![StartServer](./Misc/StartServer.png)

### Client
There can be many clients
```
npm run client
```
> ![StartClient](./Misc/StartClient.png)
> Starting the Client sends a message to the Server and the Server response with the current time

## Broadcasting
The Server can send a message to all Clients. The user types into the CLI and the Server manages the IO and broadcasts the message to all connected Clients
> ![ServerBroadcastToClients](./Misc/ServerBroadcastToClients.png)
> When a Client connects to the Server, their address and port are saved. When a broadcast is called, the message is sent to all addresses and ports connected
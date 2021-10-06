import express, { Application, Request, Response } from "express";
const app: Application = express();
const port: string = '8080';

const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

/** HTTP Server for checking if online */
app.get('/', (req: Request, res: Response) => {``
    res.send({ message: 'Server is active', timestamp: new Date() }); 
});

io.on('connection', (socket: any) => {
    console.log(socket)
    console.log('a user connected');
    /** User subscribe and publish protocol */
    socket.on("user:subscribe", (resp: any) => {
        socket.join("subscribers");
        socket.to("subscribers", "new user")
        io.emit('publish: new user has subscribed to the protocol', { resp });
        console.log({ message: 'user subscribe', resp })
    });

    /** Broker publish to all subscribers */
    socket.on("dashboard:publish", (resp: any) => {
        // TODO: Implement Authentication
        socket.emit('publish', ' message from dashboard');
        console.log({ message: 'dashboard publish', resp})
    })
});

try {
    server.listen(port, (): void => {
        console.log(`Server is active at http://localhost:${port}`);
    });
} catch (error: any) {
    console.error(`An error occurred with message ${error.toString()}`);
}
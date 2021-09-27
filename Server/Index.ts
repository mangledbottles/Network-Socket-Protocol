import express, { Application, NextFunction, Request, Response, Router } from "express";
const app: Application = express();
const port: string = '8080';

const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => { 
    res.send({ message: 'Server is active', timestamp: new Date() }); 
});

io.on('connection', (socket: any) => {
    console.log(socket)
    console.log('a user connected');
});

try {
    server.listen(port, (): void => {
        console.log(`Server is active at http://localhost:${port}`);
    });
} catch (error: any) {
    console.error(`An error occurred with message ${error.toString()}`);
}
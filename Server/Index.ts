import express, { Application, Request, Response } from "express";
import dgram from "dgram";
const app: Application = express();
const port: number = 8080;

const Server = dgram.createSocket('udp4');

/** Broker listen to all subscribers and manage protocol */


Server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    Server.close();
  });

Server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});



  

/** Launch server and listen on given port */
try {

    Server.on('listening', () => {
        const address = Server.address();
        console.log({ Server })
        console.log(`server listening ${address.address}:${address.port}`);
      });

      
    Server.bind(port, (): void => {
        console.log(`Server is active at http://localhost:${port}`);
    });
} catch (error: any) {
    console.error(`An error occurred with message ${error.toString()}`);
}
import dgram from "dgram";
import express, { Application, Request, Response } from "express";

const app: Application = express();
const socketPort: number = 8080;
const httpPort: number = 8081;

/** HTTP Server for checking status */
app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Server is active', timestamp: new Date() });
});

/** Initialise UDP Socket */
const Server = dgram.createSocket('udp4');

/** Handle errors and close Socket */
Server.on('error', (err) => {
  console.log(`Server error:\n${err.stack}`);
  Server.close();
});



/** Receive Messages */
let messagesCount = 0;
Server.on('message', (msg, rinfo) => {
  console.log(`Server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

  /** Repeat message back to Client */
  Server.send(msg, rinfo.port, 'localhost', function (error) {
  Server.send(Buffer.from(`Hello ${rinfo.port}, you are #${messagesCount++}, time is ${new Date()}`), rinfo.port, 'localhost', function (error) {
    if (error) {
      console.log(`Error sending data to Client #${rinfo.port}`)
    } else {
      console.log(`Data sent to Client #${rinfo.port}`);
    }
  });
});

/** Launch UDP Socket and HTTP Servers, and listen on given port */
try {
  Server.on('listening', () => {
    const address = Server.address();
    console.log(`Server listening ${address.address}:${address.port}`);
  });

  Server.bind(socketPort, (): void => {
    console.log(`UDP Datagram Server is active at http://localhost:${port}`);
  });

  app.listen(httpPort, (): void => {
    console.log(`HTTP Server is active at http://localhost:8081`);
  });
} catch (error: any) {
  console.error(`An error occurred with message ${error.toString()}`);
}
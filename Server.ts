import dgram from "dgram";
import express, { Application, Request, Response } from "express";

const app: Application = express();
const port: number = 8080;

/** HTTP Server for checking status */
app.get('/', (req: Request, res: Response) => {``
    res.send({ message: 'Server is active', timestamp: new Date() }); 
});

const Server = dgram.createSocket('udp4');

Server.on('error', (err) => {
  console.log(`Server error:\n${err.stack}`);
  Server.close();
});

/** Receive Messages */
Server.on('message', (msg, rinfo) => {
  console.log(`Server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

  Server.send(msg, rinfo.port, 'localhost', function (error) {
    if (error) {
      console.log(`Error sending data to Client #${rinfo.port}`)
    } else {
      console.log(`Data sent to Client #${rinfo.port}`);
    }
  });
});

/** Launch server and listen on given port */
try {
  Server.on('listening', () => {
    const address = Server.address();
    console.log(`Server listening ${address.address}:${address.port}`);
  });

  Server.bind(port, (): void => {
    console.log(`UDP Datagram Server is active at http://localhost:${port}`);
  });

  app.listen(8081, (): void => {
    console.log(`HTTP Server is active at http://localhost:8081`);
  });
} catch (error: any) {
  console.error(`An error occurred with message ${error.toString()}`);
}
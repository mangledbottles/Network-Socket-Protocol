import dgram from "dgram";
import express, { Application, Request, Response } from "express";
import * as readline from "readline";

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

/** Setup readline */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function readLineAsync(message: string) {
  return new Promise((resolve, reject) => {
    rl.question(message, (answer: string) => {
      if(answer == 'exit') return process.exit();
      broadcast(answer)
      resolve(answer);
    });
  });
} 

async function handleServerInput() {
  await readLineAsync("");
  handleServerInput()
}


/** Receive Messages */
let messagesCount = 0;
Server.on('message', (msg, rinfo) => {
  console.log(`Server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

  /** Add Client to Client List for Broadcasting */
  const { address, port } = rinfo;
  Clients.add(newClient({ address, port }));

  /** Repeat message back to Client */
  Server.send(Buffer.from(`Hello ${rinfo.port}, you are #${messagesCount++}, time is ${new Date()}`), port, address, function (error) {
    if (error) {
      console.log(`Error sending data to Client #${rinfo.port}`)
    } else {
      console.log(`Data sent to Client #${rinfo.port}`);
    }
  });
});


/** Periodically Broadcast Information from Server to all Clients */
interface Client {
  address: string;
  port: number;
}

let Clients: Set<string> = new Set();

function newClient({ address, port }: Client) {
  return JSON.stringify({ address, port });
}

function broadcast(broadcastMessage: string) {
  console.log("Broadcasting message to all Clients")

  var message = Buffer.from(broadcastMessage);
  const ClientList = Array.from(Clients);
  if(ClientList.length == 0) console.log("No active Clients");

  for (let clientNumber in ClientList) {
    const { address, port } = JSON.parse(ClientList[clientNumber]);

    Server.send(message, 0, message.length, port, address, (error) => {
      if (error) {
        console.log(`Broadcast Error sending data to Client #${port}`)
      } else {
        console.log(`Broadcast Data sent to Client #${port}`);
      }
    });

  }
}

/** Launch UDP Socket and HTTP Servers, and listen on given port */
try {
  Server.on('listening', (): void => {
    const address = Server.address();
    console.log(`Server listening ${address.address}:${address.port}`);
  });

  Server.bind(socketPort, (): void => {
    handleServerInput(); // used for broadcasting messages to Clients
    console.log(`UDP Datagram Server is active at http://localhost:${socketPort}`);
  });

  app.listen(httpPort, (): void => {
    console.log(`HTTP Server is active at http://localhost:8081`);
  });
} catch (error: any) {
  console.error(`An error occurred with starting Server ${error.toString()}`);
}
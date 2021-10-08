import dgram from "dgram";
const port: number = 8081;

const Server = dgram.createSocket('udp4');

/** Broker listen to all subscribers and manage protocol */

Server.on('error', (err) => {
  console.log(`Server error:\n${err.stack}`);
  Server.close();
});

Server.on('message', (msg, rinfo) => {
  console.log(`Server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

  Server.send(msg, rinfo.port, 'localhost', function (error) {
    if (error) {
      console.log('Error sending data to Client')
    } else {
      console.log('Data sent to Client');
    }
  });
});



/** Launch server and listen on given port */
try {

  Server.on('listening', () => {
    const address = Server.address();
    console.log({ Server })
    console.log(`Server listening ${address.address}:${address.port}`);
  });


  Server.bind(port, (): void => {
    console.log(`Server is active at http://localhost:${port}`);
  });
} catch (error: any) {
  console.error(`An error occurred with message ${error.toString()}`);
}
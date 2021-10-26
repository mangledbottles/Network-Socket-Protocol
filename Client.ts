/** Import dependecies */
import dgram from 'dgram';
import { Buffer } from 'buffer';

const socketPort: number = 8080;
const message = Buffer.from('UDP CONNETION DATA');

/** Initialise UDP Socket */
const client = dgram.createSocket('udp4');

/** Listen and handle incoming messages from Server */
client.on('message', (msg, info) => {
  console.log(`Data received from server: ${msg.toString()}`);
  console.log(`Received ${msg.length} bytes from ${info.address}:${info.port}\n`);
});

/** Send message to Server */
client.send(message, socketPort, 'localhost', (err) => {
  if (err) {
    console.log('Error sending data to Server')
    client.close();
  } else {
    console.log('Data sent to Server')
  }
});


/** 
 * Send a message to the Server in an interval of every 5 seconds
 * Enable this option by uncommenting
 */

// let intervalCount: number = 0;
// function sendMessage() {
//   client.send(Buffer.from(`Connection number ${intervalCount}`), socketPort, 'localhost', (err) => {
//     if (err) {
//       console.log('Error sending data to Server')
//       client.close();
//     } else {
//       console.log('Data sent to Server')
//     }
//   });
// }
// setInterval(sendMessage, 5000); 

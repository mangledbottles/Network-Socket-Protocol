import dgram from 'dgram';
import { Buffer } from 'buffer';
const socketPort: number = 8080;

const client = dgram.createSocket('udp4');
const message = Buffer.from('UDP IOT CONNETION DATA');

/** Listen and handle all incoming messages */
client.on('message', (msg, info) => {
  console.log(`Data received from server: ${msg.toString()}`);
  console.log(`Received ${msg.length} bytes from ${info.address}:${info.port}\n`);
});

client.on('listening', function () {
  var address = client.address();
  console.log('UDP Client listening on ' + address.address + ":" + address.port);
  client.setBroadcast(true);
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

let intervalCount: number = 0;
function sendMessage() {
  client.send(Buffer.from(`Connection number ${intervalCount}`), socketPort, 'localhost', (err) => {
    if (err) {
      console.log('Error sending data to Server')
      client.close();
    } else {
      console.log('Data sent to Server')
    }
  });
}

// setInterval(sendMessage, 5000);

import dgram from 'dgram';
import { Buffer } from 'buffer';
const port: number = 8080;

const message = Buffer.from('UDP IOT CONNETION DATA');
const client = dgram.createSocket('udp4');

client.on('message', (msg, info) => {
  console.log(`Data received from server: ${msg.toString()}`);
  console.log(`Received ${msg.length} bytes from ${info.address}:${info.port}\n`);
});

client.send(message, port, 'localhost', (err) => {
  if (err) {
    console.log('Error sending data to Server')
    client.close();
  } else {
    console.log('Data sent to Server')
  }
});
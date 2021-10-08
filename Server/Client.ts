import dgram from 'dgram';
import { Buffer } from 'buffer';

const message = Buffer.from('UDP IOT CONNETION DATA');
const client = dgram.createSocket('udp4');

client.send(message, 8080, 'localhost', (err) => {
  client.close();
});  console.log(`Data received from server: ${msg.toString()}`);
client.on('message', (msg, info) => {
  console.log(`Data received from server: ${msg.toString()}`);
  console.log(`Received ${msg.length} bytes from ${info.address}:${info.port}\n`);
});


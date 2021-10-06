import dgram from 'dgram';
import { Buffer } from 'buffer';

const message = Buffer.from('UDP IOT CONNETION DATA');
const client = dgram.createSocket('udp4');

client.send(message, 8080, 'localhost', (err) => {
  client.close();
});
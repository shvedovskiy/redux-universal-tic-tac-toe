import socketIOClient from 'socket.io-client';
import { address } from '../common/config';


console.log('Address: ', address); // eslint-disable-line no-console
const socket = socketIOClient(address);

export default socket;

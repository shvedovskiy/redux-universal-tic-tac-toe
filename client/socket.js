import socketIOClient from 'socket.io-client';
import { address } from '../common/config';


const socket = socketIOClient(address);

export default socket;

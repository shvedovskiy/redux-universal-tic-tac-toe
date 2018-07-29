/* eslint-disable import/no-extraneous-dependencies */
import io from 'socket.io-client';
import { address } from '../common/config';


const socket = io(address);

export default socket;

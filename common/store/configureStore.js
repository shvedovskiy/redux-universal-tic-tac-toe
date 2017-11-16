import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import socket from '../../client/socket';
import rootReducer from '../reducers/index';
import SERVER from '../constants/actionPrefixes';


const socketIOMiddleware = createSocketIoMiddleware(socket, SERVER);

const configureStore = preloadedState =>
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(socketIOMiddleware, thunk),
  );

export default configureStore;

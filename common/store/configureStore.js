import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import { routerMiddleware } from 'react-router-redux';
import socket from '../../client/socket';
import rootReducer from '../reducers/index';
import SERVER from '../constants/actionPrefixes';


const socketIOMiddleware = createSocketIoMiddleware(socket, SERVER);
const configureStore = (preloadedState, history) =>
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      socketIOMiddleware,
      thunk,
      routerMiddleware(history),
    ),
  );

export default configureStore;

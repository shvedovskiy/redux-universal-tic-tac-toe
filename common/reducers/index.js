import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import game from './game';
import chat from './chat';


const rootReducer = combineReducers({
  user,
  game,
  chat,
  router: routerReducer,
});

export default rootReducer;

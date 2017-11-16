import { combineReducers } from 'redux';
import user from './user';
import game from './game';
import chat from './chat';


const rootReducer = combineReducers({
  user,
  game,
  chat,
});

export default rootReducer;

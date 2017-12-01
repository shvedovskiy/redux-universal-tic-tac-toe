import {
  ERROR_LOGIN,
  INVITED_USER_ADDED,
  SUCCESSFULLY_LOGOUT,
  USER_ADDED,
  USER_LEFT,
} from '../constants/userActionTypes';


const initialState = {
  username: null,
  opponent: null,
  isLogged: false,
  isReady: false,
  invitedId: null,
  error: null,
  message: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_ADDED: {
      // Вошли в игру первыми:
      return {
        ...state,
        username: action.username,
        message: action.message,
        isLogged: !state.isLogged,
      };
    }
    case INVITED_USER_ADDED: {
      if (action.username) { // вошли в комнату как invited
        return {
          ...state,
          username: action.username,
          opponent: action.opponent,
          isLogged: !state.isLogged,
          isReady: !state.isReady,
        };
      }
      return {// в нашу комнату вошел invited
        ...state,
        opponent: action.opponent,
        isReady: !state.isReady,
      };
    }
    case ERROR_LOGIN: {
      return {
        ...state,
        error: action.error,
      };
    }
    case USER_LEFT: {
      return {
        ...state,
        opponent: null,
        message: `User ${action.username} disconnected`,
      };
    }
    case SUCCESSFULLY_LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default user;

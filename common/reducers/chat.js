import removeTypingMessage from '../util/removeTypingMessage';
import {
  NEW_MESSAGE,
  USER_STOP_TYPING,
  USER_TYPING,
} from '../constants/chatActionTypes';


const initialState = {
  messages: [],
  typing: false,
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case USER_TYPING: {
      return {
        ...state,
        typing: !state.typing,
      };
    }
    case USER_STOP_TYPING: {
      if (action.message) {
        return {
          ...state,
          messages: removeTypingMessage(state.messages, action.message),
        };
      }
      return {
        ...state,
        typing: !state.typing,
      };
    }
    case NEW_MESSAGE: {
      const { username, text, service } = action;
      return {
        ...state,
        messages: [
          ...removeTypingMessage(state.messages, `${username} is typing`),
          {
            username,
            text,
            service,
          },
        ],
      };
    }
    default: {
      return state;
    }
  }
};

export default chat;

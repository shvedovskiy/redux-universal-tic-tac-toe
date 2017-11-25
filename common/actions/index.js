import {
  ADD_INVITED_USER,
  ADD_USER,
  LOGOUT,
} from '../constants/userActionTypes';
import {
  MOVE,
  REPLAY,
  TOGGLE_MUTE,
} from '../constants/gameActionTypes';
import {
  SEND_MESSAGE,
  STOP_TYPING,
  TYPING,
} from '../constants/chatActionTypes';


export const addUser = username =>
  (dispatch, getState) => {
    if (getState().user.invitedId) {
      dispatch({
        type: ADD_INVITED_USER,
        invitedId: getState().user.invitedId,
        username,
      });
    } else {
      dispatch({
        type: ADD_USER,
        username,
      });
    }
  };

export const move = i => ({
  type: MOVE,
  number: i,
});


export const sendMessage = message =>
  (dispatch) => {
    dispatch({
      type: SEND_MESSAGE,
      text: message,
    });
  };

export const startTyping = () => ({
  type: TYPING,
});

export const stopTyping = () => ({
  type: STOP_TYPING,
});

export const logout = () => ({
  type: LOGOUT,
});

export const replay = () => ({
  type: REPLAY,
});

export const toggleMute = muteIsActive => ({
  type: TOGGLE_MUTE,
  muteIsActive,
});

import {
  MOVED,
  SET_X_O,
  SUCCESSFULLY_REPLAY,
  LEAVE_GAME,
  TOGGLE_MUTE,
} from '../constants/gameActionTypes';


const initialState = {
  X: null,
  O: null,
  winner: null,
  xIsNext: false,
  squares: Array(9).fill(null),
  lastMoveNumber: null,
  isReady: false,
  muteIsActive: false,
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case SET_X_O: {
      return {
        ...state,
        X: action.X,
        O: action.O,
        isReady: !state.isReady,
      };
    }
    case MOVED: {
      return {
        ...state,
        squares: action.squares,
        lastMoveNumber: action.lastMoveNumber,
        winner: action.winner,
        xIsNext: !state.xIsNext,
      };
    }
    case LEAVE_GAME:
    case SUCCESSFULLY_REPLAY: {
      return {
        X: null,
        O: null,
        winner: null,
        xIsNext: false,
        squares: Array(9).fill(null),
        lastMoveNumber: null,
        isReady: false,
        muteIsActive: state.muteIsActive,
      };
    }
    case TOGGLE_MUTE: {
      return {
        ...state,
        muteIsActive: action.muteIsActive,
      };
    }
    default: {
      return state;
    }
  }
};

export default game;

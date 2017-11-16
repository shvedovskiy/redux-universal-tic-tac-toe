import {
  LOOSE,
  MOVED,
  SET_X_O,
  SUCCESSFULLY_REPLAY,
  WIN,
} from '../constants/gameActionTypes';


const initialState = {
  X: null,
  O: null,
  winner: null,
  xIsNext: false,
  squares: Array(9).fill(null),
  isReady: false,
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
        winner: action.winner,
        xIsNext: !state.xIsNext,
      };
    }
    case WIN: {
      return {
        ...state,
        disabled: true,
      };
    }
    case LOOSE: {
      return {
        ...state,
        disabled: true,
      };
    }
    case SUCCESSFULLY_REPLAY: {
      return {
        ...state,
        isReady: !state.isReady,
        winner: null,
        xIsNext: false,
        squares: initialState.squares,
      };
    }
    default: {
      return state;
    }
  }
};

export default game;

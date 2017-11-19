import {
  MOVED,
  SET_X_O,
  SUCCESSFULLY_REPLAY,
} from '../constants/gameActionTypes';


const initialState = {
  X: null,
  O: null,
  winner: null,
  xIsNext: false,
  squares: Array(9).fill(null),
  lastMoveNumber: null,
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
      let disabled = false;
      if (action.winner === undefined || action.winner) {
        disabled = true;
      }

      return {
        ...state,
        squares: action.squares,
        lastMoveNumber: action.lastMoveNumber,
        winner: action.winner,
        xIsNext: !state.xIsNext,
        disabled,
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

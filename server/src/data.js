/* eslint-disable no-prototype-builtins */
// data = {
//   '6165116': {
//     owner: '6165116',
//     invited: '7627272' || null,
//     playerNames: {
//       '6165116': 'alex',
//       '7627272': 'bob'
//     } || {},
//     game: {
//       X: this.playerNames[this.owner] == 'alex' || null,
//       O: this.playerNames[this.invited] == 'bob' || null,
//       winner: true,
//       xIsNext: true,
//       stepNumber: 0,
//       history: [
//         {
//           squares: ['X', 'O', 0, 0, 0, 0, 0, 0, 0]
//         },
//         {
//           squares: ['X', 'O', 0, 0, 0, 'X', 0, 0, 0]
//         }
//       ] || [],
//       replay: false
//     }
//   }
// };
import DataAccessError from '../../common/util/DataAccessError';


const initialGameState = {
  X: null,
  O: null,
  winner: false,
  xIsNext: false,
  stepNumber: 0,
  history: [
    {
      squares: new Array(9).fill(null),
    },
  ],
  replay: false,
};

class Data {
  constructor(data) {
    this.data = data || {};
  }

  setRoomId(roomId) {
    this.roomId = roomId;
  }

  addRoomForOwner(roomId, id, username) {
    if (this.data.hasOwnProperty(roomId)) {
      throw new DataAccessError(`User ${username} already have a room`);
    }

    this.data[roomId] = {
      owner: id,
      invited: null,
      playerNames: {
        [id]: username,
      },
      game: initialGameState,
    };
    this.setRoomId(roomId);

    return this.data[roomId];
  }

  addInvitedUser(id, username, roomId = this.roomId) {
    if (!this.data.hasOwnProperty(roomId)) {
      throw new DataAccessError(`No available rooms with id ${roomId}`, true);
    }

    const room = this.data[roomId];

    if (room.invited) {
      throw new DataAccessError('Only 1 invited player passed for room', true);
    } else if (Object.values(room.playerNames).includes(username)) {
      throw new DataAccessError('Duplicate name with opponent');
    }
    room.invited = id;
    room.playerNames[id] = username;

    return room;
  }

  getRoom(roomId = this.roomId) {
    if (!this.data.hasOwnProperty(roomId)) {
      throw DataAccessError(`No such rooms for id ${roomId}`);
    }

    return this.data[roomId];
  }

  deleteRoom(roomId = this.roomId) {
    if (!this.data.hasOwnProperty(roomId)) {
      throw DataAccessError(`No such rooms for id ${roomId}`);
    }

    delete this.data[roomId];
  }

  getPlayerName(playerId, roomId = this.roomId) {
    return this.getRoom(roomId).playerNames[playerId];
  }

  getOpponentName(playerId, roomId = this.roomId) {
    const playerNames = this.getRoom(roomId).playerNames;
    const opponentId = Object.keys(playerNames).find(id => id !== playerId);
    return opponentId ? playerNames[opponentId] : null;
  }

  setXO({ X, O }, roomId = this.roomId) {
    const room = this.getRoom(roomId);
    room.game = {
      ...room.game,
      X,
      O,
    };
    return true;
  }

  move(i, roomId = this.roomId) {
    const game = this.getRoom(roomId).game;
    if (!game.X || !game.O) {
      throw DataAccessError('Illegal game state');
    }
    const [current] = [...game.history].reverse();
    const squares = [...current.squares];

    if (i > squares.length - 1 || i < 0 || squares[i]) {
      return null;
    }

    squares[i] = game.xIsNext ? 'O' : 'X';
    game.history = [
      ...game.history,
      {
        squares,
      },
    ];
    game.stepNumber += 1;
    game.xIsNext = !game.xIsNext;
    return squares;
  }

  endOfGame(roomId = this.roomId) {
    const game = this.getRoom(roomId).game;
    if (!game.winner) {
      game.winner = true;
      return true;
    }
    return null;
  }

  replay(roomId = this.roomId) {
    const game = this.getRoom(roomId).game;
    if (game.winner) {
      if (game.replay) {
        this.data[roomId].game = initialGameState;
      }
      game.replay = !game.replay;
      return true;
    }
    return null;
  }

  removeRoom(id, roomId = this.roomId) {
    let room;
    try {
      room = this.getRoom(roomId);
    } catch (e) {
      return true;
    }

    if (!Object.keys(room.playerNames).includes(id)) {
      return null;
    }

    if (room.owner !== id && room.invited === id) {
      room.invited = null;
      const name = room.playerNames[id];
      delete room.playerNames[id];
      if (room.game.X === name) {
        room.game.X = null;
      } else {
        room.game.O = null;
      }
    } else {
      this.deleteRoom(roomId);
    }
    return true;
  }
}

export default new Data();

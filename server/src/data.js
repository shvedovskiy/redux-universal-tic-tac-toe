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
//       winner: 'alex' || null,
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


class Data {
  constructor() {
    this.data = {};
  }

  setRoomId(roomId) {
    this.roomId = roomId;
  }

  addRoomForOwner(roomId, id, username) {
    if (!this.data.hasOwnProperty(roomId)) {
      this.data[roomId] = {
        owner: id,
        invited: null,
        playerNames: {
          [id]: username,
        },
        game: {
          X: null,
          O: null,
          winner: null,
          xIsNext: false,
          stepNumber: 0,
          history: [
            {
              squares: Array(9).fill(null),
            },
          ],
          replay: false,
        },
      };
    } else {
      throw new DataAccessError(`User ${id} already connected`);
    }

    this.setRoomId(roomId);
    return this.data;
  }

  addInvitedUser(id, username, roomId = this.roomId) {
    if (!this.data.hasOwnProperty(roomId)) {
      throw new DataAccessError(`No rooms for id ${roomId}`);
    }

    const room = this.data[roomId];
    room.invited = id;
    room.playerNames[id] = username;

    return this.data;
  }

  get(roomId = this.roomId) {
    if (this.data.hasOwnProperty(roomId)) {
      return this.data[roomId];
    }
    throw DataAccessError(`No such rooms for id ${roomId}`);
  }

  getPlayerName(playerId, roomId = this.roomId) {
    return this.data[roomId].playerNames[playerId];
  }

  setXO({ X, O }, roomId = this.roomId) {
    this.data[roomId].game = {
      ...this.data[roomId].game,
      X,
      O,
    };
  }

  move(i, roomId = this.roomId) {
    const game = this.data[roomId].game;
    const [current] = [...game.history].reverse();
    const squares = [...current.squares];

    if (squares[i]) {
      return;
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
  }

  getLastMove(roomId = this.roomId) {
    const history = this.data[roomId].game.history;
    const [last] = [...history].reverse();
    return last.squares;
  }

  replay(roomId = this.roomId) {
    const game = this.data[roomId].game;
    game.xIsNext = true;
    game.winner = null;
    game.stepNumber = 0;
    game.history = [
      {
        squares: new Array(9).fill(null),
      },
    ];
    game.replay = !game.replay;
  }

  removeRoom(id, roomId = this.roomId) {
    const room = this.data[roomId];

    if (!room) {
      return true;
    } else if (room.owner !== id) {
      const name = room.invited;
      room.invited = null;
      delete room.playerNames[id];
      if (room.game.X === name) {
        room.game.X = null;
      } else {
        room.game.O = null;
      }
      return true;
    }

    delete this.data[roomId];
    return true;
  }
}

export default new Data();

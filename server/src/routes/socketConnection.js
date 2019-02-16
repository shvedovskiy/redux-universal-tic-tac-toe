/* eslint-disable no-param-reassign */
import data from '../data';
import {
  ADD_INVITED_USER,
  ADD_USER,
  FATAL_ERROR_LOGIN,
  ERROR_LOGIN,
  INVITED_USER_ADDED,
  LOGOUT,
  SUCCESSFULLY_LOGOUT,
  USER_ADDED,
  USER_LEFT,
} from '../../../common/constants/userActionTypes';
import {
  MOVE,
  MOVED,
  REPLAY,
  SET_X_O,
  SUCCESSFULLY_REPLAY,
  LEAVE_GAME,
} from '../../../common/constants/gameActionTypes';
import {
  NEW_MESSAGE,
  SEND_MESSAGE,
  STOP_TYPING,
  TYPING,
  USER_STOP_TYPING,
  USER_TYPING,
} from '../../../common/constants/chatActionTypes';


function assignXO(i, j) {
  return Math.random() >= 0.5
    ? { X: i, O: j }
    : { X: j, O: i };
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]) {
      return [a, b, c];
    }
  }

  if (squares.filter(i => i).length >= 9) {
    return false;
  }
  return null;
}

export default function (io, address) {
  return function connectionHandler(socket) {
    let addedUser = false;
    let room;

    socket.on('action', (action) => {
      switch (action.type) {
        case ADD_USER: {
          if (addedUser) {
            return;
          }

          socket.username = action.username;
          room = `room-${socket.id}`;

          try {
            data.addRoomForOwner(room, socket.id, socket.username);
          } catch (e) {
            socket.emit('action', {
              type: e.fatal ? FATAL_ERROR_LOGIN : ERROR_LOGIN,
              error: e.message,
            });
            return;
          }
          addedUser = true;
          socket.join(room);
          socket.room = room;
          socket.emit('action', {
            type: USER_ADDED,
            username: action.username,
            message: `${address}login?invite=${socket.id}`,
          });
          break;
        }
        case ADD_INVITED_USER: {
          if (addedUser) {
            return;
          }

          socket.username = action.username;
          const invitedId = action.invitedId;
          room = `room-${invitedId}`;
          data.setRoomId(room);

          try {
            data.addInvitedUser(socket.id, socket.username);
          } catch (e) {
            socket.emit('action', {
              type: e.fatal ? FATAL_ERROR_LOGIN : ERROR_LOGIN,
              error: e.message,
            });
            return;
          }
          addedUser = true;
          socket.join(room);
          socket.room = room;

          const opponentName = data.getOpponentName(socket.username);
          socket.emit('action', {
            type: INVITED_USER_ADDED,
            username: socket.username,
            opponent: opponentName,
          });
          socket.broadcast.to(socket.room).emit('action', {
            type: INVITED_USER_ADDED,
            opponent: socket.username,
          });

          const X_O = assignXO(opponentName, socket.username);
          data.setXO(X_O);
          io.in(socket.room).emit('action', {
            type: SET_X_O,
            ...X_O,
          });
          break;
        }
        case MOVE: {
          data.setRoomId(socket.room);
          let game;
          try {
            game = data.getRoom().game;
          } catch (e) {
            return;
          }

          if (
            (game.xIsNext === true && socket.username !== game.O) ||
            (game.xIsNext === false && socket.username !== game.X)
          ) {
            return;
          }

          let lastMove;
          try {
            lastMove = data.move(action.number);
          } catch (e) {
            return;
          }
          if (!lastMove) {
            return;
          }

          let winner = null;
          const haveWinner = calculateWinner(lastMove);

          let successfulEndOfGame = true;
          if (haveWinner) {
            winner = {
              username: socket.username,
              values: haveWinner,
            };
            successfulEndOfGame = data.endOfGame();
          } else if (haveWinner === false) {
            winner = {
              username: undefined,
              values: null,
            };
            successfulEndOfGame = data.endOfGame();
          }

          if (!successfulEndOfGame) {
            return;
          }

          io.in(socket.room).emit('action', {
            type: MOVED,
            lastMoveNumber: action.number,
            squares: lastMove,
            winner,
          });
          break;
        }
        case SEND_MESSAGE: {
          io.in(socket.room).emit('action', {
            type: NEW_MESSAGE,
            username: socket.username,
            text: action.text,
            service: action.service,
          });
          break;
        }
        case TYPING: {
          socket.to(socket.room).emit('action', {
            type: NEW_MESSAGE,
            text: `${socket.username} is typing`,
            service: true,
          });
          socket.emit('action', {
            type: USER_TYPING,
          });
          break;
        }
        case STOP_TYPING: {
          socket.to(socket.room).emit('action', {
            type: USER_STOP_TYPING,
            message: `${socket.username} is typing`,
          });
          socket.emit('action', {
            type: USER_STOP_TYPING,
          });
          break;
        }

        case REPLAY: {
          data.setRoomId(socket.room);
          let game;
          try {
            game = data.getRoom().game;
          } catch (e) {
            return;
          }
          if (!game.winner) {
            return;
          }

          socket.emit('action', {
            type: SUCCESSFULLY_REPLAY,
          });

          const replay = data.replay();
          if (!replay) {
            return;
          }
          if (!game.replay) { // второй игрок начал игру заново
            const opponentName = data.getOpponentName(socket.id);
            const X_O = assignXO(opponentName, socket.username);
            data.setXO(X_O);

            io.in(socket.room).emit('action', {
              type: SET_X_O,
              ...X_O,
            });
          }
          break;
        }

        case LOGOUT: {
          if (addedUser) {
            addedUser = false;
          } else {
            return;
          }

          data.setRoomId(socket.room);
          if (data.removeRoom(socket.id)) {
            socket.emit('action', {
              type: SUCCESSFULLY_LOGOUT,
            });
            socket.emit('action', {
              type: LEAVE_GAME,
            });
            socket.to(socket.room).emit('action', {
              type: USER_LEFT,
              username: socket.username,
            });
            socket.leave(socket.room);
            delete socket.username;
            delete socket.room;
          }
          break;
        }
        default: {
          break;
        }
      }
    });

    socket.on('disconnect', () => {
      if ('room' in socket) {
        if (addedUser) {
          socket.to(socket.room).emit('action', {
            type: USER_LEFT,
            username: socket.username,
          });
          addedUser = false;
        }
        data.setRoomId(socket.room);
        if (data.removeRoom(socket.id)) {
          socket.leave(socket.room);
          delete socket.username;
          delete socket.room;
        }
      }
    });
  };
}

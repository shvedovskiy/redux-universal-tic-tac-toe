/* eslint-disable no-param-reassign */
import data from '../data';
import {
  ADD_INVITED_USER,
  ADD_USER,
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

export default function (io, addr) {
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
          addedUser = true;
          room = `room-${socket.id}`;
          socket.join(room);
          socket.room = room;

          try {
            data.addRoomForOwner(socket.room, socket.id, socket.username);
          } catch (e) {
            socket.emit('action', {
              type: ERROR_LOGIN,
              error: e.message,
            });
            return;
          }

          socket.emit('action', {
            type: USER_ADDED,
            username: action.username,
            message: `http://${addr.host || 'localhost'}:${addr.port}/login?invite=${socket.id}`,
          });
          break;
        }
        case ADD_INVITED_USER: {
          if (addedUser) {
            return;
          }

          const invitedId = action.invitedId;
          room = `room-${invitedId}`;

          data.setRoomId(room);

          if (data.get().invited) {
            socket.emit('action', {
              type: ERROR_LOGIN,
              error: 'Only 1 invited player passed for room',
            });
            return;
          }

          socket.username = action.username;
          addedUser = true;

          socket.join(room);
          socket.room = room;

          const opponentName = data.getPlayerName(invitedId);

          if (socket.username === opponentName) {
            socket.emit('action', {
              type: ERROR_LOGIN,
              error: 'Duplicate name with opponent',
            });
            return;
          }

          try {
            data.addInvitedUser(socket.id, socket.username);
          } catch (e) {
            socket.emit('action', {
              type: ERROR_LOGIN,
              error: e.message,
            });
          }

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
          const game = data.get().game;
          if (
            (game.xIsNext === true && socket.username !== game.O) ||
            (game.xIsNext === false && socket.username !== game.X)
          ) {
            return;
          }

          data.move(action.number);

          const lastMove = data.getLastMove();
          let winner = null;
          const haveWinner = calculateWinner(lastMove);

          if (haveWinner) {
            winner = {
              username: socket.username,
              values: haveWinner,
            };
          } else if (haveWinner === false) {
            winner = {
              username: undefined,
              values: null,
            };
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
          const game = data.get().game;
          if (game.winner) {
            return;
          }

          socket.emit('action', {
            type: SUCCESSFULLY_REPLAY,
          });

          if (game.replay) { // второй игрок пока не начал игру заново
            data.replay();
            const opponentName = game.X === socket.username ? game.O : game.X;
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

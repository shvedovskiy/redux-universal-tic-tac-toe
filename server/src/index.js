/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import Server from 'socket.io';
import { Server as httpServer } from 'http';
import ssrRouter from './routes/ssr';
import connectionHandler from './routes/socketConnection';
import '../../common/env';
import {
  address,
  STATIC_PATH,
  PORT,
} from '../../common/config';


function normalizePort(val) {
  const parsedPort = parseInt(val, 10);
  if (isNaN(parsedPort)) return val;
  if (parsedPort >= 0) return parsedPort;
  return false;
}

const app = express();
const server = httpServer(app);
const io = Server(server);

const port = normalizePort(PORT);
app.set('port', port);
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '..', 'views'));
app.use(STATIC_PATH, express.static(path.resolve(__dirname, '..', 'public')));
app.use('/*', ssrRouter);
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

server.listen(port);
server.on('error', (error) => {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
server.on('listening', () => {
  console.info(`==> 🌎  Listening on port ${port}. Open up ${address} in your browser.`);
});

io.on('connection', connectionHandler(io, address));

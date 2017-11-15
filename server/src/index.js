/* eslint-disable no-console */
import express from 'express';
// import favicon from 'serve-favicon';
import Server from 'socket.io';
import { Server as httpServer } from 'http';
import ssrRouter from './routes/ssr';
import connectionHandler from './routes/socketConnection';


function normalizePort(val) {
  const parsedPort = parseInt(val, 10);
  if (isNaN(parsedPort)) return val;
  if (parsedPort >= 0) return parsedPort;
  return false;
}

const app = express();
const server = httpServer(app);
const io = Server(server);

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


app.set('view engine', 'ejs');
// app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(express.static('public'));
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
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `Pipe ${addr}`
    : `Port ${addr.port}`;
  console.info(`==> 🌎  Listening on port ${bind}. Open up http://localhost:${addr.port}/ in your browser.`);
});

io.on('connection', connectionHandler(io));

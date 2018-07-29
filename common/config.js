/* eslint-disable prefer-destructuring */
export const NODE_ENV = process.env.NODE_ENV || 'production';
export const STATIC_PATH = process.env.STATIC_PATH || '/static/';
export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || '';
export const PORT = process.env.SERVER_PORT || '3000';
export const HTTPS = process.env.HTTPS || '';
export const NOW = process.env.NOW || '';
export const NOW_URL = process.env.NOW_URL || '';
/* eslint-enable prefer-destructuring */

export const address = do {
  if (NODE_ENV === 'production') {
    if (NOW) {
      `${NOW_URL}/`;
    } else {
      `http${HTTPS === 'true' ? 's' : ''}://${SERVER_HOSTNAME || 'localhost'}:${PORT}/`;
    }
  } else if (NODE_ENV === 'development') {
    `http://localhost:${PORT}/`;
  } else {
    ''; // eslint-disable-line no-unused-expressions
  }
};

export const isProd = NODE_ENV === 'production';

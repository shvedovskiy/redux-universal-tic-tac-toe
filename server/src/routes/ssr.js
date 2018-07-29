import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import rootReducer from '../../../common/reducers/index';

import App from '../../../common/containers/App/App';
import { STATIC_PATH } from '../../../common/config';
import data from '../data';


const router = express.Router();
router.get('/', (req, res) => {
  let persistedStore = {
    user: {
      username: null,
      opponent: null,
      isLogged: false,
      isReady: false,
      invitedId: null,
      error: null,
      message: null,
    },
  };

  if (req.query.invite) {
    const invitedId = req.query.invite;
    let opponentName;
    let err;

    try {
      data.setRoomId(`room-${invitedId}`);
      opponentName = data.getOpponentName(invitedId);
    } catch (e) {
      err = true;
      persistedStore = {
        user: {
          ...persistedStore.user,
          error: 'Unknown invite token',
        },
      };
    }

    if (!err) {
      persistedStore = {
        user: {
          ...persistedStore.user,
          opponent: opponentName,
          invitedId,
        },
      };
    }
  }

  const context = {};
  const store = createStore(rootReducer, persistedStore);
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.originalUrl}
        context={context}
      >
        <App />
      </StaticRouter>
    </Provider>,
  );
  const finalState = store.getState();

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    res.status(200).render('index.ejs', {
      html,
      script: JSON.stringify(finalState),
      STATIC_PATH,
    });
  }
});


export default router;

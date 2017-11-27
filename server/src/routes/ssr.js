import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import rootReducer from '../../../common/reducers/index';

import App from '../../../common/containers/App';
import data from '../data';
import {
  ADD_OPPONENT,
  REQUEST_ERROR,
} from '../../../common/constants/userActionTypes';


const router = express.Router();
router.get('/', (req, res) => {
  const store = createStore(rootReducer);

  if (req.query.invite) {
    const invitedId = req.query.invite;
    let opponentName;
    let err;

    try {
      data.setRoomId(`room-${invitedId}`);
      opponentName = data.getOpponentName(invitedId);
    } catch (e) {
      err = true;
      store.dispatch({
        type: REQUEST_ERROR,
        error: 'Unknown invite token',
      });
    }

    if (!err) {
      store.dispatch({
        type: ADD_OPPONENT,
        opponent: opponentName,
        invitedId,
      });
    }
  }

  const context = {};
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
    res.status(200).render('../views/index.ejs', {
      html,
      script: JSON.stringify(finalState),
    });
  }
});


export default router;

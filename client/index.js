import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import configureStore from '../common/store/configureStore';
import App from '../common/containers/App/App';
import './assets/images/favicons';
import './index.scss';

const history = createHistory();

const preloadedState = window.__INITIAL_STATE__; // eslint-disable-line
delete window.__INITIAL_STATE__; // eslint-disable-line
const store = configureStore(preloadedState, history);

const render = (Component) => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('app'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('../common/containers/App/App', () => {
    // eslint-disable-next-line
    const nextApp = require('../common/containers/App/App').default;
    render(nextApp);
  });
}

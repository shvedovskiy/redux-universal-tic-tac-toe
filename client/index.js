/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';
import './assets/images/favicons';


const preloadedState = window.__INITIAL_STATE__; // eslint-disable-line
delete window.__INITIAL_STATE__; // eslint-disable-line
const store = configureStore(preloadedState);

const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <Component />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

render(withRouter(App));

if (module.hot) {
  module.hot.accept('./app', () => {
    // eslint-disable-next-line
    const nextApp = require('../common/containers/App').default;
    render(nextApp);
  });
}

// module.hot.accept('./reducers', () => {
//   // eslint-disable-next-line
//   const nextRootReducer = require('./reducers/index');
//   store.replaceReducer(nextRootReducer);
// });

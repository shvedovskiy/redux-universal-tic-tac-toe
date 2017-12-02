/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
// import { AppContainer } from 'react-hot-loader';
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

// const render = (Component) => {
//   ReactDOM.hydrate(
//     <AppContainer>
//       <Provider store={store}>
//         <Router>
//           <Component />
//         </Router>
//       </Provider>
//     </AppContainer>,
//     document.getElementById('app'),
//   );
// };

render(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    // eslint-disable-next-line
    const nextApp = require('../common/containers/App/App').default;
    render(nextApp);
  });
}

// module.hot.accept('./reducers', () => {
//   // eslint-disable-next-line
//   const nextRootReducer = require('./reducers/index');
//   store.replaceReducer(nextRootReducer);
// });

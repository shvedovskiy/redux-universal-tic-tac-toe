import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import Login from '../Login/Login';
import Main from '../../components/MainPage/MainPage';
import PrivateRoute from '../../util/PrivateRoute';
import Controls from '../../components/Controls/Controls';
import { toggleMute } from '../../actions/index';
import styles from './App.scss';


const App = props => (
  <div styleName="main-wrapper">
    <Controls onToggleMute={props.toggleMute} styles={styles} />
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Redirect to="/login" />
        )}
      />

      <Route
        exact
        path="/login"
        render={() => (
          <Login />
        )}
      />

      <PrivateRoute
        logged={props.isLogged}
        path="/game"
        render={() => (
          <Main
            isReady={props.isReady}
            message={props.message}
          />
        )}
      />
    </Switch>
  </div>
);

App.propTypes = {
  isReady: PropTypes.bool,
  isLogged: PropTypes.bool,
  message: PropTypes.string,
  toggleMute: PropTypes.func.isRequired,
};

App.defaultProps = {
  isReady: false,
  isLogged: false,
  message: null,
};

const mapStateToProps = state => ({
  isLogged: state.user.isLogged,
  isReady: state.user.isReady,
  message: state.user.message,
});

const mapDispatchToProps = dispatch => ({
  toggleMute(muteIsActive) {
    dispatch(toggleMute(muteIsActive));
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CSSModules(App, styles)),
);

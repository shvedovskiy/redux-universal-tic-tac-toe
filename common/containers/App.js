import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from './Login';
import Main from '../components/Main';
import PrivateRoute from '../util/PrivateRoute';


class App extends React.Component {
  static propTypes = {
    isReady: PropTypes.bool,
    isLogged: PropTypes.bool,
    message: PropTypes.string,
  };

  static defaultProps = {
    isReady: false,
    isLogged: false,
    message: null,
  };

  render() {
    return (
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
          logged={this.props.isLogged}
          path="/game"
          render={() => (
            <Main
              isReady={this.props.isReady}
              message={this.props.message}
            />
          )}
        />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.user.isLogged,
  isReady: state.user.isReady,
  message: state.user.message,
});

export default connect(mapStateToProps)(App);

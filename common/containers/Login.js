import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import * as actions from '../actions/index';


class Login extends React.Component {
  static propTypes = {
    isLogged: PropTypes.bool,
    username: PropTypes.string,
    error: PropTypes.string,
    handleSetUsername: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isLogged: false,
    username: '',
    error: null,
  };

  render() {
    return (
      this.props.isLogged ?
        <Redirect push to="/game" />
        : (
          <LoginPage
            handleSetUsername={this.props.handleSetUsername}
            username={this.props.username}
            error={this.props.error}
          />
        )
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.user.isLogged,
  username: state.user.username,
  error: state.user.error,
});

const mapDispatchToProps = dispatch => ({
  handleSetUsername(name) {
    dispatch(actions.addUser(name));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginPage from '../../components/LoginPage/LoginPage';
import * as actions from '../../actions/index';


const Login = props => (
  props.isLogged ?
    <Redirect push to="/game" />
    : (
      <LoginPage
        handleSetUsername={props.handleSetUsername}
        username={props.username}
        error={props.error}
      />
    )
);

Login.propTypes = {
  isLogged: PropTypes.bool,
  username: PropTypes.string,
  error: PropTypes.string,
  handleSetUsername: PropTypes.func.isRequired,
};

Login.defaultProps = {
  isLogged: false,
  username: '',
  error: null,
};

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

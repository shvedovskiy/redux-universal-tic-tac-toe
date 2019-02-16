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
        fatalError={props.fatalError}
        error={props.error}
      />
    )
);

Login.propTypes = {
  isLogged: PropTypes.bool,
  fatalError: PropTypes.string,
  error: PropTypes.string,
  handleSetUsername: PropTypes.func.isRequired,
};

Login.defaultProps = {
  isLogged: false,
  fatalError: '',
  error: '',
};

const mapStateToProps = state => ({
  isLogged: state.user.isLogged,
  fatalError: state.user.fatalError,
  error: state.user.error,
});

const mapDispatchToProps = dispatch => ({
  handleSetUsername(name) {
    dispatch(actions.addUser(name));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

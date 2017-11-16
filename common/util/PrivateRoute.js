import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


const PrivateRoute = ({ render, logged, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      logged === true
        ? render(props)
        : <Redirect to={{
          pathname: '/login',
          state: { from: props.location },
        }}
        />
    )}
  />
);

PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  logged: PropTypes.bool.isRequired,
  location: PropTypes.string,
};

PrivateRoute.defaultProps = {
  location: null,
};


export default PrivateRoute;

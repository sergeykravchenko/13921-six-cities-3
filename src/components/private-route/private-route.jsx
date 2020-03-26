import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {AppRoute} from "../../utils.js";

const PrivateRoute = (props) => {
  const {render, path, exact, isAuthenticated} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          isAuthenticated
            ? render()
            : <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};


export default PrivateRoute;

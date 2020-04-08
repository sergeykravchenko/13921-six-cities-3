import * as React from "react";
import {Route, Redirect} from "react-router-dom";
import {AppRoute} from "../../utils.js";

interface Props {
  render: () => void;
  path: string;
  exact: boolean;
  isAuthenticated: boolean;

}

const PrivateRoute: React.FC<Props> = (props: Props) => {
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

export default PrivateRoute;

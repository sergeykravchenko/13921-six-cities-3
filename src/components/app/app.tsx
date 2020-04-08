import * as React from "react";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AuthorizationStatus} from "../../reducer/user/user";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import PrivateRoute from "../private-route/private-route";
import Main from "../main/main";
import Favorites from "../favorites/favorites";
import OfferCard from "../offer-card/offer-card";
import SignIn from "../sign-in/sign-in";
import history from "../../history";
import {AppRoute} from "../../utils";

const App: React.FC<{isAuthenticated: boolean}> = ({isAuthenticated}) => {
  return <Router
    history={history}
  >
    <Switch>
      <Route exact path={AppRoute.ROOT} component={Main}/>
      <Route exact path={`${AppRoute.OFFER}/:id`} component={OfferCard}/>
      <Route exact path={AppRoute.LOGIN}
        render={() =>
          !isAuthenticated ?
            <SignIn/>
            :
            <Redirect to={AppRoute.ROOT} />
        }
      />
      <PrivateRoute
        exact
        path={AppRoute.FAVORITES}
        isAuthenticated={isAuthenticated}
        render={() => {
          return (<Favorites/>);
        }}
      />
    </Switch>
  </Router>;
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
  };
};

export {App};
export default connect(mapStateToProps, null)(React.memo(App));

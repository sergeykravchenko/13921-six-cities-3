import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import PrivateRoute from "../private-route/private-route.jsx";
import Main from "../main/main.jsx";
import Favorites from "../favorites/favorites.jsx";
import OfferCard from "../offer-card/offer-card.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import history from "../../history";
import {AppRoute} from "../../utils";

const App = (props) => {
  const {
    isAuthenticated,
  } = props;

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

App.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
  };
};

export {App};
export default connect(mapStateToProps, null)(React.memo(App));

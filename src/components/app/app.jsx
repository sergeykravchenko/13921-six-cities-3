import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/state/state";
import {getAllOffers, getNearByOffer} from "../../reducer/data/selectors";
import {
  getCities,
  getActiveCity,
  getOffers,
  getActiveSortType,
  getActiveOffer,
  getFetchStatus,
  getActiveMarker,
} from "../../reducer/state/selectors";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import PrivateRoute from "../private-route/private-route.jsx";
import Header from "../header/header.jsx";
import Main from "../main/main.jsx";
import Favorites from "../favorites/favorites.jsx";
import OfferCard from "../offer-card/offer-card.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import history from "../../history";
import {AppRoute} from "../../utils";

class App extends PureComponent {
  render() {
    const {
      isFetching,
      isAuthenticated,
      offers,
      nearByOffer,
      activeMarker,
      cities,
      activeCity,
      activeOffer,
      activeSortType,
      handleCityClick,
      handlePlaceTitleClick,
      handleSortTypeClick,
      handleCardHover,
      login,
    } = this.props;

    return <Router
      history={history}
    >
      <Switch>
        <Route exact path={AppRoute.ROOT}
          render={(props)=>
            <div className="page page--gray page--main">
              <Header/>
              <Main {...props}
                isFetching={isFetching}
                offers={offers}
                activeMarker={activeMarker}
                handlePlaceTitleClick={handlePlaceTitleClick}
                cities={cities}
                activeCity={activeCity}
                activeSortType={activeSortType}
                handleCityClick={handleCityClick}
                handleSortTypeClick={handleSortTypeClick}
                handleCardHover={handleCardHover}
              />
            </div>
          }
        >
        </Route>
        <Route exact path={`${AppRoute.OFFER}/:id`}
          render={(props) =>
            <div className="page">
              <Header/>
              <OfferCard {...props}
                isAuthenticated={isAuthenticated}
                offer={activeOffer}
                nearByOffer={nearByOffer}
                activeMarker={activeMarker}
                activeCity={activeCity}
                handlePlaceTitleClick={handlePlaceTitleClick}
              />
            </div>
          }
        />
        <Route exact path={AppRoute.LOGIN}
          render={() =>
            !isAuthenticated ?
              <div className="page page--gray page--login">
                <Header/>
                <SignIn
                  city={activeCity}
                  onSubmit={login}
                />
              </div>
              :
              <Redirect to={AppRoute.ROOT} />
          }
        >
        </Route>
      </Switch>
      <Switch>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          isAuthenticated={isAuthenticated}
          render={() => {
            return (
              <div className="page">
                <Header/>
                <Favorites
                  handlePlaceTitleClick={handlePlaceTitleClick}
                />
              </div>
            );
          }}
        />
      </Switch>
    </Router>;
  }
}

App.propTypes = {
  isFetching: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func,
  allOffers: PropTypes.array,
  offers: PropTypes.array,
  nearByOffer: PropTypes.array,
  closest: PropTypes.array,
  cities: PropTypes.array,
  activeMarker: PropTypes.number,
  activeCity: PropTypes.object,
  activeOffer: PropTypes.object,
  activeSortType: PropTypes.string,
  handleCityClick: PropTypes.func.isRequired,
  handlePlaceTitleClick: PropTypes.func.isRequired,
  handleSortTypeClick: PropTypes.func,
  handleCardHover: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    isFetching: getFetchStatus(state),
    isAuthenticated: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
    allOffers: getAllOffers(state),
    nearByOffer: getNearByOffer(state),
    cities: getCities(state),
    activeCity: getActiveCity(state),
    offers: getOffers(state),
    activeOffer: getActiveOffer(state),
    activeMarker: getActiveMarker(state),
    activeSortType: getActiveSortType(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  handleCityClick(activeCity) {
    dispatch(ActionCreator.changeCity(activeCity));
  },
  handlePlaceTitleClick(offer) {
    dispatch(ActionCreator.getActiveOffer(offer));
    dispatch(DataOperation.loadComments(offer.id));
    dispatch(DataOperation.loadNearByOffer(offer.id));
  },
  handleSortTypeClick(type) {
    dispatch(ActionCreator.getActiveSortType(type));
  },
  handleCardHover(id) {
    dispatch(ActionCreator.getActiveMarker(id));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/state/state";
import {getAllOffers} from "../../reducer/data/selectors";
import {
  getCities,
  getActiveCity,
  getOffers,
  getActiveSortType,
  getActiveOffer,
  getFetchStatus,
  getHoveredOffer,
} from "../../reducer/state/selectors";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthorizationStatus, getUser} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import Header from "../header/header.jsx";
import Main from "../main/main.jsx";
import OfferCard from "../offer-card/offer-card.jsx";
import SignIn from "../sign-in/sign-in.jsx";

class App extends PureComponent {
  _renderApp() {
    const {
      isFetching,
      isAuthenticated,
      offers,
      hoveredOffer,
      cities,
      activeCity,
      activeOffer,
      activeSortType,
      handleCityClick,
      handlePlaceTitleClick,
      handleSortTypeClick,
      handleCardHover,
      user,
    } = this.props;

    if (activeOffer) {
      return (
        <div className="page">
          <Header
            isAuthenticated={isAuthenticated}
            user={user}/>
          <OfferCard
            isAuthenticated={isAuthenticated}
            offer={activeOffer}
            offers={offers}
            hoveredOffer={hoveredOffer}
            activeCity={activeCity}
            handlePlaceTitleClick={handlePlaceTitleClick}
            handleCardHover={handleCardHover}
          />
        </div>
      );
    }

    return (
      <div className="page page--gray page--main">
        <Header
          isAuthenticated={isAuthenticated}
          user={user}
        />
        <Main
          isFetching={isFetching}
          offers={offers}
          hoveredOffer={hoveredOffer}
          handlePlaceTitleClick={handlePlaceTitleClick}
          cities={cities}
          activeCity={activeCity}
          activeSortType={activeSortType}
          handleCityClick={handleCityClick}
          handleSortTypeClick={handleSortTypeClick}
          handleCardHover={handleCardHover}
        />
      </div>
    );
  }

  _renderSignIn() {
    const {login, user, isAuthenticated, activeCity} = this.props;
    if (!isAuthenticated) {
      return (
        <div className="page page--gray page--login">
          <Header
            isAuthenticated={isAuthenticated}
            user={user}
          />
          <SignIn
            city={activeCity}
            onSubmit={login}
          />
        </div>
      );
    }
    return this._renderApp();
  }

  render() {
    return <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {this._renderApp()}
        </Route>
        <Route exact path="/offer">
          <OfferCard />
        </Route>
        <Route exact path="/sign-in">
          {this._renderSignIn()}
        </Route>
      </Switch>
    </BrowserRouter>;
  }
}

App.propTypes = {
  isFetching: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func,
  allOffers: PropTypes.array,
  offers: PropTypes.array,
  closest: PropTypes.array,
  cities: PropTypes.array,
  hoveredOffer: PropTypes.number,
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
    cities: getCities(state),
    activeCity: getActiveCity(state),
    offers: getOffers(state),
    activeOffer: getActiveOffer(state),
    hoveredOffer: getHoveredOffer(state),
    activeSortType: getActiveSortType(state),
    user: getUser(state),
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
  },
  handleSortTypeClick(type) {
    dispatch(ActionCreator.getActiveSortType(type));
  },
  handleCardHover(id) {
    dispatch(ActionCreator.getHoveredOffer(id));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

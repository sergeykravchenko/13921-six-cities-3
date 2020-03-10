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
import Main from "../main/main.jsx";
import OfferCard from "../offer-card/offer-card.jsx";

class App extends PureComponent {
  _renderApp() {
    const {
      isFetching,
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
    } = this.props;

    if (activeOffer) {
      return (
        <OfferCard
          offer={activeOffer}
          offers={offers}
          hoveredOffer={hoveredOffer}
          activeCity={activeCity}
          handlePlaceTitleClick={handlePlaceTitleClick}
          handleCardHover={handleCardHover}
        />
      );
    }
    return (
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
    );
  }

  render() {
    return <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {this._renderApp()}
        </Route>
        <Route exact path="/dev-offer">
          <OfferCard />
        </Route>
      </Switch>
    </BrowserRouter>;
  }
}

App.propTypes = {
  isFetching: PropTypes.bool,
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
};

const mapStateToProps = (state) => {
  return {
    isFetching: getFetchStatus(state),
    allOffers: getAllOffers(state),
    cities: getCities(state),
    activeCity: getActiveCity(state),
    offers: getOffers(state),
    activeOffer: getActiveOffer(state),
    hoveredOffer: getHoveredOffer(state),
    activeSortType: getActiveSortType(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
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

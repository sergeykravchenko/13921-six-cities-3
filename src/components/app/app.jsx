import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import Main from "../main/main.jsx";
import OfferCard from "../offer-card/offer-card.jsx";

class App extends PureComponent {
  _renderApp() {
    const {
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
          activeCity={activeCity}
          handlePlaceTitleClick={handlePlaceTitleClick}
        />
      );
    }
    return (
      <Main
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
  offers: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  hoveredOffer: PropTypes.number,
  activeCity: PropTypes.object.isRequired,
  activeOffer: PropTypes.object,
  activeSortType: PropTypes.string.isRequired,
  handleCityClick: PropTypes.func.isRequired,
  handlePlaceTitleClick: PropTypes.func.isRequired,
  handleSortTypeClick: PropTypes.func,
  handleCardHover: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cities: state.cities,
    activeCity: state.activeCity,
    offers: state.offers,
    activeOffer: state.activeOffer,
    hoveredOffer: state.hoveredOffer,
    activeSortType: state.activeSortType,
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleCityClick(activeCity) {
    dispatch(ActionCreator.changeCity(activeCity));
    dispatch(ActionCreator.getOffers(activeCity.name));
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

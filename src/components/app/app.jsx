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
      cities,
      activeCity,
      activeOffer,
      handleCityClick,
      handlePlaceTitleClick
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
        handlePlaceTitleClick={handlePlaceTitleClick}
        cities={cities}
        activeCity={activeCity}
        handleCityClick={handleCityClick}
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
  activeCity: PropTypes.object.isRequired,
  activeOffer: PropTypes.object,
  handleCityClick: PropTypes.func.isRequired,
  handlePlaceTitleClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    cities: state.cities,
    activeCity: state.activeCity,
    offers: state.offers,
    activeOffer: state.activeOffer,
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
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

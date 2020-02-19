import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferCard from "../offer-card/offer-card.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeId: 0,
    };

    this.onPlaceTitleClick = this.onPlaceTitleClick.bind(this);
  }

  _renderApp() {
    const {offersCount, offers} = this.props;
    const {activeId} = this.state;

    if (activeId < 1) {
      return (
        <Main
          offersCount={offersCount}
          offers={offers}
          onPlaceTitleClick={this.onPlaceTitleClick}
        />
      );
    }

    if (activeId >= 1) {
      return (
        <OfferCard
          offer={offers[activeId - 1]}
          onPlaceTitleClick={this.onPlaceTitleClick}
        />
      );
    }

    return null;
  }

  onPlaceTitleClick(id) {
    this.setState({
      activeId: id
    });
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
  offersCount: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    priceText: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    features: PropTypes.exact({
      type: PropTypes.string.isRequired,
      bedrooms: PropTypes.number.isRequired,
      maxGuests: PropTypes.number.isRequired,
    }),
    isPremium: PropTypes.bool,
    isInBookmark: PropTypes.bool,
    houseHolds: PropTypes.arrayOf(PropTypes.string).isRequired,
    gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
    host: PropTypes.exact({
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      pro: PropTypes.bool
    }),
    description: PropTypes.arrayOf(PropTypes.string).isRequired
  })).isRequired
};

export default App;

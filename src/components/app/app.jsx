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
  offers: PropTypes.array.isRequired
};

export default App;

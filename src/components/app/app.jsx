import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const onPlaceTitleClick = () => {};

const App = (props) => {
  const {offersCount, offers} = props;
  return (
    <Main
      offersCount={offersCount}
      offers={offers}
      onPlaceTitleClick={onPlaceTitleClick}
    />
  );
};

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    priceText: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    isPremium: PropTypes.bool,
    isInBookmark: PropTypes.bool
  })).isRequired
};

export default App;

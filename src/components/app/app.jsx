import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const onPlaceTitleClick = () => {};

const App = (props) => {
  const {offersCount, offersNames} = props;
  return (
    <Main
      offersCount = {offersCount}
      offersNames = {offersNames}
      onPlaceTitleClick = {onPlaceTitleClick}
    />
  );
};

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  offersNames: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default App;

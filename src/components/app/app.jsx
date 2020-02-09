import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const App = (props) => {
  const {offersCount, offersNames} = props;
  return (
    <Main
      offersCount = {offersCount}
      offersNames = {offersNames}
    />
  );
};

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  offersNames: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default App;

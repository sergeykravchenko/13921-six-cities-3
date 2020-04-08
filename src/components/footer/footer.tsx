import * as React from "react";
import {Link} from "react-router-dom";
import {AppRoute} from "../../utils";

const Footer = () => {
  return (
    <footer className="footer container">
      <Link to={AppRoute.ROOT} className="footer__logo-link" href="main.html">
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
      </Link>
    </footer>
  );
};

export default React.memo(Footer);


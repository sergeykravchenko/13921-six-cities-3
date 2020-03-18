
import React from "react";
import PropTypes from "prop-types";

let Header = (props) => {
  const {user, isAuthenticated} = props;
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link" href="main.html">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {isAuthenticated === false ?
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </a>
                  :
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"
                      style={{
                        backgroundImage: `url(https://htmlacademy-react-3.appspot.com/six-cities${user.avatar_url})`,
                        borderRadius: `50%`
                      }}
                    >
                    </div>
                    <span className="header__user-name user__name">{user.email}</span>
                  </a>
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

export default Header = React.memo(Header);

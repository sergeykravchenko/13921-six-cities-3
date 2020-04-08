
import * as React from "react";
import {connect} from "react-redux";
import {getAuthorizationStatus, getUser} from "../../reducer/user/selectors";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Link} from 'react-router-dom';
import {AppRoute} from "../../utils";
import {User} from "../../types";

interface Props {
  user: User;
  isAuthenticated: boolean;
  login: () => void;
}

const Header: React.FC<Props> = (props: Props) => {
  const {user, isAuthenticated} = props;
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.ROOT} className="header__logo-link" href="main.html">
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link to={isAuthenticated === false ? AppRoute.LOGIN : AppRoute.FAVORITES} className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper"
                    style={isAuthenticated === true ? {
                      backgroundImage: `url(https://htmlacademy-react-3.appspot.com/six-cities${user.avatar_url})`,
                      borderRadius: `50%`,
                    }
                      : {}
                    }
                  >
                  </div>
                  <span className="header__login">{isAuthenticated === false ? `Sign in` : user.email}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
    user: getUser(state),
  };
};


export {Header};
export default connect(mapStateToProps, null)(React.memo(Header));

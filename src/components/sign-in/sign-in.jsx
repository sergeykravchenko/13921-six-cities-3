import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getActiveCity} from "../../reducer/state/selectors";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import Header from "../header/header.jsx";

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.emailRef = createRef();
    this.passwordRef = createRef();

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(evt) {
    const {onLoginSubmit} = this.props;

    evt.preventDefault();

    onLoginSubmit({
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  render() {
    const {activeCity} = this.props;
    return (
      <div className="page page--gray page--login">
        <Header/>
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form"
                action="#"
                method="post"
                onSubmit={this.handleFormSubmit}
              >
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input className="login__input form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    ref={this.emailRef}
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input className="login__input form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    ref={this.passwordRef}
                  />
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{activeCity.name}</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

SignIn.propTypes = {
  activeCity: PropTypes.object,
  onLoginSubmit: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    activeCity: getActiveCity(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoginSubmit(authData) {
    dispatch(UserOperation.login(authData));
  },
});

export {SignIn};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

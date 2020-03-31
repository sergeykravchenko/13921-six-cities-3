import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getFavoritesByCity} from "../../reducer/state/selectors";
import {ActionCreator} from "../../reducer/state/state";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import Header from "../header/header.jsx";
import FavoritesEmpty from "../favorites-empty/favorites-empty.jsx";
import PlaceCard from '../place-card/place-card.jsx';
import Footer from "../footer/footer.jsx";

class Favorites extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const {favorites, handlePlaceTitleClick} = this.props;

    if (!favorites || favorites.length <= 0) {
      return (
        <div className="page page--favorites-empty">
          <Header/>
          <FavoritesEmpty />
          <Footer />
        </div>
      );
    }
    return (
      <div className="page page__main--favorites">
        <Header/>
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {favorites.map((item) =>
                  Object.entries(item).map(([city, offers]) =>
                    <li key={city} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {offers.map((offer) =>
                          <PlaceCard
                            bemblock={`favorites`}
                            key={offer.id}
                            place={offer}
                            handlePlaceTitleClick={handlePlaceTitleClick}
                          />
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

Favorites.propTypes = {
  favorites: PropTypes.array,
  handlePlaceTitleClick: PropTypes.func,
  onMount: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    favorites: getFavoritesByCity(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onMount() {
    dispatch(DataOperation.loadFavorites());
  },
  handlePlaceTitleClick(offer) {
    dispatch(ActionCreator.getActiveOffer(offer));
    dispatch(DataOperation.loadComments(offer.id));
    dispatch(DataOperation.loadNearByOffer(offer.id));
  },
});

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

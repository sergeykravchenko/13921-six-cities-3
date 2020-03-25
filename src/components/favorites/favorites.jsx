import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getFavorites} from "../../reducer/state/selectors";
import {PlaceCard} from '../place-card/place-card.jsx';

const Favorites = (props) => {
  const {favorites, handlePlaceTitleClick} = props;
  if (favorites.length < 1) {
    return null;
  }
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {favorites.map((item) => {
              return (
                <li key={item.id} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>Amsterdam</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <PlaceCard
                      place={item}
                      handlePlaceTitleClick={handlePlaceTitleClick}/>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
};

Favorites.propTypes = {
  favorites: PropTypes.array.isRequired,
  handlePlaceTitleClick: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    favorites: getFavorites(state),
  };
};

export {Favorites};
export default connect(mapStateToProps, null)(Favorites);

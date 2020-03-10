import React from "react";
import PropTypes from "prop-types";

const PlaceCard = (props) => {
  const {place, handlePlaceTitleClick, handleCardHover} = props;
  const {
    id,
    name,
    picture,
    price,
    priceText,
    rating,
    features,
    isPremium,
    isInBookmark
  } = place;

  return (
    <article onMouseEnter={() => handleCardHover(id)} onMouseLeave={() => handleCardHover(0)} className="cities__place-card place-card">
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        :
        ``
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={picture} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price} </b>
            <span className="place-card__price-text">&#47;&nbsp;{priceText}</span>
          </div>
          <button className={`place-card__bookmark-button ${isInBookmark ? `place-card__bookmark-button--active` : ``} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating < 5 ? Math.floor(rating) * 20 : 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a onClick={() => handlePlaceTitleClick(place)} href="#">{name}</a>
        </h2>
        <p className="place-card__type">{features.type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  place: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    priceText: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    features: PropTypes.exact({
      type: PropTypes.string.isRequired,
      bedrooms: PropTypes.number.isRequired,
      maxGuests: PropTypes.number.isRequired,
    }),
    isPremium: PropTypes.bool,
    isInBookmark: PropTypes.bool,
    houseHolds: PropTypes.arrayOf(PropTypes.string).isRequired,
    gallery: PropTypes.arrayOf(PropTypes.string).isRequired,
    host: PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      isPro: PropTypes.bool
    }),
    description: PropTypes.string.isRequired,
  }).isRequired,
  handleCardHover: PropTypes.func,
  handlePlaceTitleClick: PropTypes.func.isRequired
};

export default PlaceCard;

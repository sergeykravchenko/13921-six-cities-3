import React from "react";
import PropTypes from "prop-types";

const PlaceCard = (props) => {
  const {place, onPlaceTitleClick, onHoverCard} = props;
  const {
    id,
    name,
    picture,
    price,
    priceText,
    rating,
    type,
    isPremium,
    isInBookmark
  } = place;

  const Rating = {
    1: `20%`,
    2: `40%`,
    3: `60%`,
    4: `80%`,
    5: `100%`
  };

  return (
    <article onMouseEnter={() => (onHoverCard(id))} className="cities__place-card place-card">
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
            <span style={{width: `${Rating[rating]}`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a onClick={onPlaceTitleClick} href="#">{name}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  place: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    priceText: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    isPremium: PropTypes.bool,
    isInBookmark: PropTypes.bool
  }).isRequired,
  onHoverCard: PropTypes.func.isRequired,
  onPlaceTitleClick: PropTypes.func.isRequired
};

export default PlaceCard;

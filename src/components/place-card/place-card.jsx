import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {AppRoute} from "../../utils";
import {Link} from 'react-router-dom';

const ImageSize = {
  cities: [260, 200],
  favorites: [150, 110],
};

const PlaceCard = (props) => {
  const {
    place,
    onPlaceTitleClick,
    onCardHover,
    onBookmarkStatusChange,
  } = props;

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

  let {bemblock} = props;
  if (bemblock === undefined) {
    bemblock = `cities`;
  }

  return (
    <article
      className={bemblock ? `${bemblock}__place-card place-card` : `place-card`}
      onMouseEnter={onCardHover ? () => onCardHover(id) : undefined}
      onMouseLeave={onCardHover ? () => onCardHover(0) : undefined}
    >
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        :
        ``
      }
      <div className={bemblock ? `${bemblock}__image-wrapper place-card__image-wrapper` : `place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={picture} width={ImageSize[bemblock][0]} height={ImageSize[bemblock][1]} alt="Place image" />
        </a>
      </div>
      <div className={bemblock ? `${bemblock}__info place-card__info` : `place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price} </b>
            <span className="place-card__price-text">&#47;&nbsp;{priceText}</span>
          </div>
          <button className={`place-card__bookmark-button ${isInBookmark ? `place-card__bookmark-button--active` : ``} button`}
            onClick={() => onBookmarkStatusChange(id, !isInBookmark)}
            type="button"
          >
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
          <Link to={`${AppRoute.OFFER}/${id}`} onClick={() => onPlaceTitleClick(place)} href="#">{name}</Link>
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
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    host: PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      isPro: PropTypes.bool
    }),
    description: PropTypes.string.isRequired,
  }).isRequired,
  onCardHover: PropTypes.func,
  onPlaceTitleClick: PropTypes.func.isRequired,
  onBookmarkStatusChange: PropTypes.func,
  bemblock: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => ({
  onBookmarkStatusChange(id, status) {
    status = status ? 1 : 0;
    return dispatch(DataOperation.changeBookmarkStatus(id, status));
  },
});

export {PlaceCard};
export default connect(null, mapDispatchToProps)(PlaceCard);

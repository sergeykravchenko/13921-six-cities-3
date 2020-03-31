import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {ActionCreator} from "../../reducer/state/state";
import {
  getActiveCity,
  getActiveOffer,
  getActiveMarker,
  getFetchStatus,
} from "../../reducer/state/selectors";
import {getNearByOffer, getAllOffers} from "../../reducer/data/selectors";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import Header from "../header/header.jsx";
import PlaceCard from "../place-card/place-card.jsx";
import ReviewsList from "../reviews-list/reviews-list.jsx";
import Map from "../map/map.jsx";

const OfferCard = (props) => {
  const {
    isFetching,
    offers,
    nearByOffer,
    onLoadData,
    isAuthenticated,
    handleBookmarkStatusChange,
    match,
  } = props;
  let {activeOffer} = props;
  const id = Number(match.params.id);

  if (activeOffer === null) {
    activeOffer = offers.find((item) => {
      if (id === item.id) {
        return onLoadData(item);
      }
      return null;
    });
  }

  if (isFetching) {
    return null;
  }

  const {
    name,
    price,
    priceText,
    rating,
    features,
    isPremium,
    isInBookmark,
    houseHolds,
    gallery,
    host,
    description,
    zoom,
  } = activeOffer;

  return (
    <div className="page">
      <Header/>
      <main id={id} className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {gallery.slice(0, 6).map((item, i) => (
                <div key={i} className="property__image-wrapper">
                  <img className="property__image" src={item} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ?
                <div className="property__mark">
                  <span>Premium</span>
                </div>
                : ``
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {name}
                </h1>
                <button
                  className={`property__bookmark-button
                  ${isInBookmark ? `property__bookmark-button--active` : ``} button`}
                  onClick={() => handleBookmarkStatusChange(id, !isInBookmark)}
                  type="button"
                >
                  <svg className="place-card__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${rating < 5 ? Math.floor(rating) * 20 : 100}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {features.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {features.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {features.maxGuests} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;{priceText}</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {houseHolds.map((item, i) => (
                    <li key={i} className="property__inside-item">
                      {item}
                    </li>
                  ))
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${host.isPro ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={`/${host.img}`} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewsList isAuthenticated={isAuthenticated} id={id}/>
              </section>
            </div>
          </div>
          <Map bemBlock={`property`} coords={activeOffer.coords} activeMarker={id} offers={[...nearByOffer, activeOffer]} zoom={zoom}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearByOffer.map((place) => (
                <PlaceCard key={place.id}
                  place={place}
                  handlePlaceTitleClick={onLoadData}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

OfferCard.propTypes = {
  isAuthenticated: PropTypes.bool,
  nearByOffer: PropTypes.array,
  activeOffer: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    picture: PropTypes.string,
    zoom: PropTypes.number,
    price: PropTypes.number,
    priceText: PropTypes.string,
    rating: PropTypes.number,
    features: PropTypes.exact({
      type: PropTypes.string.isRequired,
      bedrooms: PropTypes.number.isRequired,
      maxGuests: PropTypes.number.isRequired,
    }),
    isPremium: PropTypes.bool,
    isInBookmark: PropTypes.bool,
    houseHolds: PropTypes.arrayOf(PropTypes.string),
    gallery: PropTypes.arrayOf(PropTypes.string),
    host: PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      isPro: PropTypes.bool
    }),
    coords: PropTypes.arrayOf(PropTypes.number),
    description: PropTypes.string,
  }),
  onLoadData: PropTypes.func,
  city: PropTypes.shape({
    name: PropTypes.string,
  }),
  activeMarker: PropTypes.number,
  match: PropTypes.object,
  handleBookmarkStatusChange: PropTypes.func,
  offers: PropTypes.array,
  isFetching: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isFetching: getFetchStatus(state),
    isAuthenticated: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
    activeOffer: getActiveOffer(state),
    nearByOffer: getNearByOffer(state),
    activeMarker: getActiveMarker(state),
    activeCity: getActiveCity(state),
    offers: getAllOffers(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoadData(offer) {
    dispatch(ActionCreator.getActiveOffer(offer));
    dispatch(DataOperation.loadComments(offer.id));
    dispatch(DataOperation.loadNearByOffer(offer.id));
  },
  handleBookmarkStatusChange(id, status) {
    status = status ? 1 : 0;
    return dispatch(DataOperation.changeBookmarkFromCard(id, status));
  },
});

export {OfferCard};
export default connect(mapStateToProps, mapDispatchToProps)(OfferCard);

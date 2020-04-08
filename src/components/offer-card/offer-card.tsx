import * as React from "react";
import {connect} from "react-redux";
import {Operation as DataOperation} from "../../reducer/data/data";
import {ActionCreator} from "../../reducer/state/state";
import {
  getActiveCity,
  getActiveOffer,
  getActiveMarker,
  getFetchStatus,
} from "../../reducer/state/selectors";
import {getNeighbors, getAllOffers} from "../../reducer/data/selectors";
import {AuthorizationStatus} from "../../reducer/user/user";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import Header from "../header/header";
import PlaceCard from "../place-card/place-card";
import ReviewsList from "../reviews-list/reviews-list";
import Map from "../map/map";
import {Offer, id as idType} from "../../types";
import {RouteComponentProps} from "react-router";

interface TParams {
  id: string;
}

interface Props extends RouteComponentProps<TParams> {
  isFetching: boolean;
  offers: Offer[];
  activeOffer: Offer;
  neighbors: Offer[];
  onLoadData: (offer: Offer) => void;
  isAuthenticated: boolean;
  onBookmarkStatusChange: (id: idType, status: boolean) => void;
}

const IMAGES_NUM = 6;

const OfferCard: React.FC<Props> = (props: Props) => {
  const {
    isFetching,
    offers,
    neighbors,
    onLoadData,
    isAuthenticated,
    onBookmarkStatusChange,
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
    images,
    host,
    description,
    zoom,
  } = activeOffer;

  return (
    <div className="page">
      <Header/>
      <main id={id + ``} className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, IMAGES_NUM).map((item, i) => (
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
                  onClick={() => onBookmarkStatusChange(id, !isInBookmark)}
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
                    <img className="property__avatar user__avatar" src={`/${host.avatar}`} width="74" height="74" alt="Host avatar" />
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
          <Map bemBlock={`property`} coords={activeOffer.coords} activeMarker={id} offers={[...neighbors, activeOffer]} zoom={zoom}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {neighbors.map((place) => (
                <PlaceCard key={place.id}
                  place={place}
                  onPlaceTitleClick={onLoadData}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isFetching: getFetchStatus(state),
    isAuthenticated: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
    activeOffer: getActiveOffer(state),
    neighbors: getNeighbors(state),
    activeMarker: getActiveMarker(state),
    activeCity: getActiveCity(state),
    offers: getAllOffers(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoadData(offer) {
    dispatch(ActionCreator.getActiveOffer(offer));
    dispatch(DataOperation.loadComments(offer.id));
    dispatch(DataOperation.loadNeighbors(offer.id));
  },
  onBookmarkStatusChange(id, status) {
    status = status ? 1 : 0;
    return dispatch(DataOperation.changeBookmarkFromCard(id, status));
  },
});

export {OfferCard};
export default connect(mapStateToProps, mapDispatchToProps)(OfferCard);

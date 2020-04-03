import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";
import {SortType} from "../../utils";

class OffersList extends PureComponent {
  constructor(props) {
    super(props);
    this._getSortedOffers = this._getSortedOffers.bind(this);
  }

  _getSortedOffers(offers, activeSortType) {
    switch (activeSortType) {
      case SortType.PRICE_TO_LOW:
        return offers.slice().sort((a, b) => b.price - a.price);
      case SortType.PRICE_TO_HIGH:
        return offers.slice().sort((a, b) => a.price - b.price);
      case SortType.TOP_RATED:
        return offers.slice().sort((a, b) => b.rating - a.rating);
    }
    return offers;
  }

  render() {
    const {offers, activeSortType, onPlaceTitleClick, onCardHover} = this.props;
    const sortedOffers = this._getSortedOffers(offers, activeSortType);

    return (
      <div className="cities__places-list places__list tabs__content">
        {sortedOffers.map((offer) =>
          <PlaceCard key={offer.id}
            place={offer}
            onPlaceTitleClick={onPlaceTitleClick}
            onCardHover={onCardHover}
          />
        )}
      </div>
    );
  }
}

OffersList.propTypes = {
  offers: PropTypes.array.isRequired,
  activeSortType: PropTypes.string.isRequired,
  onPlaceTitleClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func,
  onBookmarkStatusChange: PropTypes.func,
};

export default OffersList;

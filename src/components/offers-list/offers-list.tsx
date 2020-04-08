import * as React from "react";
import PlaceCard from "../place-card/place-card";
import {SortType} from "../../utils";
import {Offer} from "../../types";

interface Props {
  offers: Offer[];
  activeSortType: string;
  onPlaceTitleClick: () => void;
  onCardHover: () => void;
}

class OffersList extends React.PureComponent<Props, null> {
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

export default OffersList;

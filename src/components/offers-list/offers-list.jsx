import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";

class OffersList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: 0
    };

    this._setActiveCard = this._setActiveCard.bind(this);
  }

  _setActiveCard(id) {
    this.setState({
      activeCard: id
    });
  }

  render() {
    const {offers, onPlaceTitleClick} = this.props;
    const offerList = offers.map((offer) =>
      <PlaceCard key={offer.id}
        place={offer}
        onPlaceTitleClick={onPlaceTitleClick}
        onHoverCard={this._setActiveCard}
      />
    );
    return (
      <React.Fragment>{offerList}</React.Fragment>
    );
  }
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    priceText: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    isPremium: PropTypes.bool,
    isInBookmark: PropTypes.bool
  })).isRequired,
  onPlaceTitleClick: PropTypes.func.isRequired,
};

export default OffersList;
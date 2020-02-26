import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";

class OffersList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null
    };

    this._setActiveCard = this._setActiveCard.bind(this);
  }

  _setActiveCard(id) {
    this.setState({
      activeCard: id
    });
  }

  render() {
    const {offers, handlePlaceTitleClick} = this.props;
    const offerList = offers.map((offer) =>
      <PlaceCard key={offer.id}
        place={offer}
        handlePlaceTitleClick={handlePlaceTitleClick}
        onHoverCard={this._setActiveCard}
      />
    );
    return (
      <React.Fragment>{offerList}</React.Fragment>
    );
  }
}

OffersList.propTypes = {
  offers: PropTypes.array.isRequired,
  handlePlaceTitleClick: PropTypes.func.isRequired,
};

export default OffersList;

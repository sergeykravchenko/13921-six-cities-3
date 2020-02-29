import React from "react";
import PropTypes from "prop-types";
import Sort from "../sort/sort.jsx";
import LocationsList from "../locations-list/locations-list.jsx";
import OffersList from "../offers-list/offers-list.jsx";
import Map from '../map/map.jsx';
import NoOffers from "../no-offers/no-offers.jsx";

const Main = (props) => {
  const {
    offers,
    hoveredOffer,
    cities,
    activeCity,
    activeSortType,
    handleCityClick,
    handlePlaceTitleClick,
    handleSortTypeClick,
    handleCardHover} = props;

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <LocationsList
              cities={cities}
              activeCity={activeCity}
              handleCityClick={handleCityClick}
            />
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} place{offers.length > 1 && `s`} to stay in {activeCity.name}</b>
            <Sort activeSortType={activeSortType} handleSortTypeClick={handleSortTypeClick}/>
            {offers.length ?
              <OffersList offers={offers} handleCardHover={handleCardHover} activeSortType={activeSortType} handlePlaceTitleClick={handlePlaceTitleClick}/>
              :
              <NoOffers city={activeCity}/>
            }
          </section>
          <div className="cities__right-section">
            <Map bemBlock={`cities`} activeCity={activeCity} hoveredOffer={hoveredOffer} offers={offers}/>
          </div>
        </div>
      </div>
    </main>
  );
};

Main.propTypes = {
  cities: PropTypes.array.isRequired,
  activeCity: PropTypes.object.isRequired,
  activeSortType: PropTypes.string.isRequired,
  hoveredOffer: PropTypes.number,
  handleCityClick: PropTypes.func.isRequired,
  offers: PropTypes.array.isRequired,
  handlePlaceTitleClick: PropTypes.func.isRequired,
  handleSortTypeClick: PropTypes.func.isRequired,
  handleCardHover: PropTypes.func,
};

export default Main;

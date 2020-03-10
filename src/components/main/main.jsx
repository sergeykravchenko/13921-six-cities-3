import React from "react";
import PropTypes from "prop-types";
import Sort from "../sort/sort.jsx";
import withToggle from '../../hocs/with-toggle/with-toggle.jsx';
import LocationsList from "../locations-list/locations-list.jsx";
import OffersList from "../offers-list/offers-list.jsx";
import Map from '../map/map.jsx';
import NoOffers from "../no-offers/no-offers.jsx";

const SortWrapped = withToggle(Sort);

const Main = (props) => {
  const {
    isFetching,
    offers,
    hoveredOffer,
    cities,
    activeCity,
    activeSortType,
    handleCityClick,
    handlePlaceTitleClick,
    handleSortTypeClick,
    handleCardHover} = props;

  if (isFetching !== false) {
    return (
      <p>Грузим предложения ...</p>
    );
  } else {
    return (
      <div className="page page--gray page--main">
        <main className={`page__main page__main--index ${!offers.length && `page__main--index-empty`}`}>
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
            {offers.length ?
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offers.length} place{offers.length > 1 && `s`} to stay in {activeCity.name}</b>
                  <SortWrapped activeSortType={activeSortType} handleSortTypeClick={handleSortTypeClick}/>
                  <OffersList offers={offers} handleCardHover={handleCardHover} activeSortType={activeSortType} handlePlaceTitleClick={handlePlaceTitleClick}/>
                </section>
                <div className="cities__right-section">
                  <Map bemBlock={`cities`} activeCity={activeCity} hoveredOffer={hoveredOffer} offers={offers} zoom={activeCity.zoom}/>
                </div>
              </div>
              :
              <NoOffers city={activeCity}/>
            }
          </div>
        </main>
      </div>
    );
  }
};

Main.propTypes = {
  allOffers: PropTypes.array,
  activeCity: PropTypes.object,
  offers: PropTypes.array,
  cities: PropTypes.array,
  activeSortType: PropTypes.string,
  hoveredOffer: PropTypes.number,
  handleCityClick: PropTypes.func.isRequired,
  handlePlaceTitleClick: PropTypes.func.isRequired,
  handleSortTypeClick: PropTypes.func.isRequired,
  handleCardHover: PropTypes.func,
};

export default Main;

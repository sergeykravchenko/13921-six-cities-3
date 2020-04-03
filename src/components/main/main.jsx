import React from "react";
import PropTypes from "prop-types";
import Sort from "../sort/sort.jsx";
import withToggle from '../../hocs/with-toggle/with-toggle.jsx';
import {connect} from "react-redux";
import {
  getCities,
  getActiveCity,
  getActiveOffer,
  getOffers,
  getActiveSortType,
  getFetchStatus,
  getActiveMarker,
} from "../../reducer/state/selectors";
import {ActionCreator} from "../../reducer/state/state";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import Header from "../header/header.jsx";
import LocationsList from "../locations-list/locations-list.jsx";
import OffersList from "../offers-list/offers-list.jsx";
import Map from '../map/map.jsx';
import NoOffers from "../no-offers/no-offers.jsx";

const SortWrapped = withToggle(Sort);

const Main = (props) => {
  const {
    isFetching,
    offers,
    activeMarker,
    cities,
    activeCity,
    activeSortType,
    onCityClick,
    onPlaceTitleClick,
    onSortTypeClick,
    onCardHover} = props;

  if (isFetching) {
    return (
      <p>Грузим предложения ...</p>
    );
  } else {
    return (
      <div className="page page--gray page--main">
        <Header />
        <div className="page page--gray page--main">
          <main className={`page__main page__main--index ${!offers.length && `page__main--index-empty`}`}>
            <h1 className="visually-hidden">Cities</h1>
            <div className="tabs">
              <section className="locations container">
                <LocationsList
                  cities={cities}
                  activeCity={activeCity}
                  onCityClick={onCityClick}
                />
              </section>
            </div>
            <div className="cities">
              {offers.length ?
                <div className="cities__places-container container">
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{offers.length} place{offers.length > 1 && `s`} to stay in {activeCity.name}</b>
                    <SortWrapped activeSortType={activeSortType} onSortTypeClick={onSortTypeClick}/>
                    <OffersList offers={offers} onCardHover={onCardHover} activeSortType={activeSortType} onPlaceTitleClick={onPlaceTitleClick}/>
                  </section>
                  <div className="cities__right-section">
                    <Map
                      bemBlock={`cities`}
                      coords={activeCity.coords}
                      activeMarker={activeMarker}
                      offers={offers}
                      zoom={activeCity.zoom}
                    />
                  </div>
                </div>
                :
                <NoOffers city={activeCity}/>
              }
            </div>
          </main>
        </div>
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
  activeMarker: PropTypes.number,
  onCityClick: PropTypes.func.isRequired,
  onPlaceTitleClick: PropTypes.func.isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isFetching: getFetchStatus(state),
    offers: getOffers(state),
    activeMarker: getActiveMarker(state),
    cities: getCities(state),
    activeCity: getActiveCity(state),
    activeSortType: getActiveSortType(state),
    activeOffer: getActiveOffer(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCityClick(activeCity) {
    dispatch(ActionCreator.getActiveCity(activeCity));
  },
  onPlaceTitleClick(offer) {
    dispatch(ActionCreator.getActiveOffer(offer));
    dispatch(DataOperation.loadComments(offer.id));
    dispatch(DataOperation.loadNeighbors(offer.id));
  },
  onSortTypeClick(type) {
    dispatch(ActionCreator.getActiveSortType(type));
  },
  onCardHover(id) {
    dispatch(ActionCreator.getActiveMarker(id));
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);

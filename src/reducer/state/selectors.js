import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {getAllOffers, getFavorites} from "../data/selectors";
import {getCities as getUniqCities} from '../../utils';

export const getCities = createSelector(
    getAllOffers,
    (offers) => getUniqCities(offers)
);

export const getActiveCity = (state) => {
  return state[NameSpace.STATE].activeCity;
};

export const getActiveSortType = (state) => {
  return state[NameSpace.STATE].activeSortType;
};

export const getActiveOffer = (state) => {
  return state[NameSpace.STATE].activeOffer;
};

export const getFetchStatus = (state) => {
  return state[NameSpace.STATE].isFetching;
};

export const getActiveMarker = (state) => {
  return state[NameSpace.STATE].activeMarker;
};

export const getRequestStatus = (state) => {
  return state[NameSpace.STATE].requestStatus;
};

export const getOffers = createSelector(
    getAllOffers,
    getActiveCity,
    (offers, activeCity) => {
      return offers.filter((item) => item.city.name === activeCity.name);
    }
);

export const getFavoritesByCity = createSelector(
    getFavorites,
    (offers) => {
      if (!offers) {
        return null;
      }
      const cities = getUniqCities(offers);
      return cities.map((city) => ({
        [city.name]: offers.filter((item) => item.city.name === city.name)
      }));
    }
);

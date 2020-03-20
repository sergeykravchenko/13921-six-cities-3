import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {getAllOffers} from "../data/selectors";
import {getCities as getUniq} from '../../utils';

export const getCities = createSelector(
    getAllOffers,
    (offers) => getUniq(offers)
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



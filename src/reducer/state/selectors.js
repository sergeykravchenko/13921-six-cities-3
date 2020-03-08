import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {getAllOffers} from "../data/selectors";

export const getCities = createSelector(
    getAllOffers,
    (offers) => [...new Set(offers.map((item) => item.city.name))]
);

export const getActiveCity = (state) => {
  return state[NameSpace.STATE].cities[0];
};

export const getOffers = createSelector(
    getAllOffers,
    getActiveCity,
    (offers, activeCity) => {
      return offers.filter((item) => item.city.name === activeCity.name);
    }
);

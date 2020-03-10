import NameSpace from "../name-space.js";

export const getAllOffers = (state) => {
  return state[NameSpace.DATA].allOffers;
};

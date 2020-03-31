import NameSpace from "../name-space.js";

export const getAllOffers = (state) => {
  return state[NameSpace.DATA].allOffers;
};

export const getNearByOffer = (state) => {
  return state[NameSpace.DATA].nearByOffer;
};

export const getComments = (state) => {
  return state[NameSpace.DATA].comments;
};

export const getFavorites = (state) => {
  return state[NameSpace.DATA].favorites;
};


import NameSpace from "../name-space.js";

export const getAllOffers = (state) => {
  return state[NameSpace.DATA].allOffers;
};

export const getNeighbors = (state) => {
  return state[NameSpace.DATA].neighbors;
};

export const getComments = (state) => {
  return state[NameSpace.DATA].comments;
};

export const getFavorites = (state) => {
  return state[NameSpace.DATA].favorites;
};


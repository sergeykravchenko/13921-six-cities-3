import NameSpace from "../name-space.js";

export const getAllOffers = (state) => {
  console.log(state[NameSpace.DATA].allOffers);
  return state[NameSpace.DATA].allOffers;
};

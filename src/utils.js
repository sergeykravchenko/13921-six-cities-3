export const SortType = {
  POPULAR: `Popular`,
  PRICE_TO_HIGH: `Price: low to high`,
  PRICE_TO_LOW: `Price: high to low`,
  TOP_RATED: `Top rated first`
};

export const RequestStatus = {
  SUCCESS: `SUCCESS`,
  WAITING: `WAITING`,
  FAILURE: `FAILURE`,
};

export const AppRoute = {
  LOGIN: `/login`,
  ROOT: `/`,
  OFFER: `/offer`,
  FAVORITES: `/favorites`,
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getCities = (array) => {
  const cities = array.map((item) => item.city).reduce((unique, o) => {
    if (!unique.some((obj) => obj.name === o.name)) {
      unique.push(o);
    }
    return unique;
  }, []);
  return cities;
};

export const getOffersByCity = (array, city) => {
  return array.filter((item) => item.city.name === city);
};

export const replaceItem = (item, array) => {
  const newArray = [...array];
  const index = newArray.findIndex((offer) => offer.id === item.id);
  newArray[index] = item;
  return newArray;
};

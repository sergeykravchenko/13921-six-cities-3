export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getCities = (array) => {
  const cities = new Set(array.map((item) => item.city));
  return [...cities];
};

export const getOffersByCity = (array, city) => {
  return array.filter((item) => item.city.name === city);
};

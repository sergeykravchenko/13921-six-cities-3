import React from 'react';
import App from './app.jsx';
import renderer from 'react-test-renderer';

const offersCount = 8;
const offers = [
  {
    "id": 1,
    "name": `Canal View Prinsengracht`,
    "picture": `img/room.jpg`,
    "price": 120,
    "priceText": `night`,
    "rating": 4,
    "type": `Private room`,
    "isPremium": true,
    "isInBookmark": true

  }, {
    "id": 2,
    "name": `Nice, cozy, warm big bed apartment`,
    "picture": `img/apartment-02.jpg`,
    "price": 80,
    "priceText": `night`,
    "rating": 4,
    "type": `Apartment`
  }, {
    "id": 3,
    "name": `Wood and stone place`,
    "picture": `img/room.jpg`,
    "price": 132,
    "priceText": `night`,
    "rating": 5,
    "type": `Private room`,
    "isPremium": true
  }, {
    "id": 4,
    "name": `Beautiful &amp; luxurious apartment at great location`,
    "picture": `img/apartment-01.jpg`,
    "price": 180,
    "priceText": `night`,
    "rating": 4,
    "type": `Apartment`
  }
];

it(`App renders correctly`, () => {
  const tree = renderer
    .create(<App
      offersCount={offersCount}
      offers={offers}
      onPlaceTitleClick={()=>{}}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

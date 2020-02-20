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
    "features": {
      "type": `Private room`,
      "bedrooms": 8,
      "maxGuests": 7,
    },
    "isPremium": true,
    "isInBookmark": true,
    "houseHolds": [
      `Wi-Fi`,
      `Washing machine`,
    ],
    "gallery": [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
    ],
    "host": {
      "name": `Max`,
      "img": `img/avatar-max.jpg`,
      "pro": true,
    },
    "description": [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`],
    "coords": [52.3909553943508, 4.85309666406112],

  }, {
    "id": 2,
    "name": `Nice, cozy, warm big bed apartment`,
    "picture": `img/apartment-02.jpg`,
    "price": 80,
    "priceText": `night`,
    "rating": 4,
    "features": {
      "type": `Apartment`,
      "bedrooms": 8,
      "maxGuests": 7,
    },
    "houseHolds": [
      `Wi-Fi`,
      `Heating`,
      `Coffee machine`,
    ],
    "gallery": [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/room.jpg`,
    ],
    "host": {
      "name": `Max`,
      "img": `img/avatar-max.jpg`,
      "pro": true,
    },
    "description": [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`],
    "coords": [52.3909553943508, 4.85309666406196],
  }, {
    "id": 3,
    "name": `Wood and stone place`,
    "picture": `img/room.jpg`,
    "price": 132,
    "priceText": `night`,
    "rating": 5,
    "features": {
      "type": `Apartment`,
      "bedrooms": 8,
      "maxGuests": 7,
    },
    "isPremium": true,
    "houseHolds": [
      `Wi-Fi`,
      `Washing machine`,
      `Towels`,
    ],
    "gallery": [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
    ],
    "host": {
      "name": `Angelina`,
      "img": `img/avatar-angelina.jpg`,
      "pro": false,
    },
    "description": [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`],
    "coords": [52.3909553943508, 4.85309666406248],
  }, {
    "id": 4,
    "name": `Beautiful &amp; luxurious apartment at great location`,
    "picture": `img/apartment-01.jpg`,
    "price": 180,
    "priceText": `night`,
    "rating": 4,
    "features": {
      "type": `Private room`,
      "bedrooms": 8,
      "maxGuests": 7,
    },
    "houseHolds": [
      `Wi-Fi`,
      `Washing machine`,
      `Towels`,
      `Heating`,
      `Coffee machine`,
    ],
    "gallery": [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/room.jpg`,
    ],
    "host": {
      "name": `Max`,
      "img": `img/avatar-max.jpg`,
      "pro": true,
    },
    "description": [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`],
    "coords": [52.3909553943508, 4.85309666406198],
  }
];

it(`App renders correctly`, () => {
  const tree = renderer
    .create(<App
      offersCount={offersCount}
      offers={offers}
      onPlaceTitleClick={()=>{}}
    />, {
      createNodeMock: () => {
        return document.createElement(`div`);
      }})
    .toJSON();
  expect(tree).toMatchSnapshot();
});

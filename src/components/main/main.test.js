import React from 'react';
import Main from './main.jsx';
import renderer from 'react-test-renderer';

const offers = [
  {
    "id": 1,
    "name": `Canal View Prinsengracht`,
    "picture": `img/room.jpg`,
    "price": 120,
    "priceText": `night`,
    "rating": 4.8,
    "features": {
      "type": `Private room`,
      "bedrooms": 3,
      "maxGuests": 3,
    },
    "isPremium": true,
    "isInBookmark": true,
    "houseHolds": [
      `Wi-Fi`,
      `Washing machine`,
      `Towels`,
      `Heating`,
      `Coffee machine`,
      `Baby seat`,
      `Kitchen`,
      `Dishwasher`,
      `Cabel TV`,
      `Fridge`,
    ],
    "gallery": [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/room.jpg`,
      `img/studio-01.jpg`,
      `img/apartment-03.jpg`,
    ],
    "host": {
      "name": `Max`,
      "img": `img/avatar-max.jpg`,
      "pro": true,
    },
    "description": [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`],
    "coords": [52.3909553943508, 4.85309666406198],
  }, {
    "id": 2,
    "name": `Nice, cozy, warm big bed apartment`,
    "picture": `img/apartment-02.jpg`,
    "price": 80,
    "priceText": `night`,
    "rating": 4,
    "features": {
      "type": `Apartment`,
      "bedrooms": 3,
      "maxGuests": 3,
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
      `img/studio-01.jpg`,
      `img/apartment-03.jpg`,
    ],
    "host": {
      "name": `Angelina`,
      "img": `img/avatar-angelina.jpg`,
      "pro": false,
    },
    "description": [`An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`],
    "coords": [52.369553943508, 4.85309666406198],
  }, {
    "id": 3,
    "name": `Wood and stone place`,
    "picture": `img/room.jpg`,
    "price": 132,
    "priceText": `night`,
    "rating": 5,
    "features": {
      "type": `Private room`,
      "bedrooms": 4,
      "maxGuests": 3,
    },
    "isPremium": true,
    "houseHolds": [
      `Baby seat`,
      `Kitchen`,
      `Dishwasher`,
      `Cabel TV`,
    ],
    "gallery": [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/room.jpg`,
      `img/studio-01.jpg`,
      `img/apartment-03.jpg`,
    ],
    "host": {
      "name": `Max`,
      "img": `img/avatar-max.jpg`,
      "pro": false,
    },
    "description": [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`],
    "coords": [52.3909553943508, 4.929309666406198],
  }, {
    "id": 4,
    "name": `Beautiful &amp; luxurious apartment at great location`,
    "picture": `img/apartment-01.jpg`,
    "price": 180,
    "priceText": `night`,
    "rating": 4,
    "features": {
      "type": `Apartment`,
      "bedrooms": 5,
      "maxGuests": 3,
    },
    "houseHolds": [
      `Heating`,
      `Coffee machine`,
      `Baby seat`,
      `Kitchen`,
    ],
    "gallery": [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/room.jpg`,
      `img/studio-01.jpg`,
      `img/apartment-03.jpg`,
    ],
    "host": {
      "name": `Angelina`,
      "img": `img/avatar-angelina.jpg`,
      "pro": true,
    },
    "description": [`An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`],
    "coords": [52.3809553943508, 4.939309666406198],
  }
];

const cities = [`Amsterdam`, `Paris`];
const activeCity = {"name": `Amsterdam`, "coords": [222, 333]};

it(`Main renders correctly`, () => {
  const tree = renderer
    .create(<Main
      offers={offers}
      cities={cities}
      activeCity={activeCity}
      handleCityClick={() =>{}}
      handlePlaceTitleClick={() => {}}
    />, {
      createNodeMock: () => {
        return document.createElement(`div`);
      }})
    .toJSON();
  expect(tree).toMatchSnapshot();
});

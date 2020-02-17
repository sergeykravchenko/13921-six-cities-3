import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const offersCount = 12;
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
  }
];

it(`Should title link be pressed`, () => {
  const onPlaceTitleClick = jest.fn();

  const main = shallow(
      <Main
        offersCount={offersCount}
        offers={offers}
        onPlaceTitleClick={onPlaceTitleClick}
      />
  );

  const PlaceTitleLinks = main.find(`.place-card__name a`);

  PlaceTitleLinks.forEach((item) =>{
    item.props().onClick();
  });

  expect(onPlaceTitleClick.mock.calls.length).toBe(PlaceTitleLinks.length);
});

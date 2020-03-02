import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";

const place = {
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
  "coords": [52.3809553943508, 4.939309666406198],
};

it(`Render place`, () => {
  const handlePlaceTitleClick = jest.fn();
  const handleCardHover = jest.fn();

  const tree = renderer
    .create(
        <PlaceCard
          place={place}
          handlePlaceTitleClick={handlePlaceTitleClick}
          handleCardHover={handleCardHover}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

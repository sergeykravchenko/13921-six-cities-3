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
  "type": `Private room`,
  "isPremium": true,
  "isInBookmark": true
};

it(`Render place`, () => {
  const onPlaceTitleClick = jest.fn();
  const onHoverCard = jest.fn();

  const tree = renderer
    .create(
        <PlaceCard
          place={place}
          onPlaceTitleClick={onPlaceTitleClick}
          onHoverCard = {onHoverCard}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

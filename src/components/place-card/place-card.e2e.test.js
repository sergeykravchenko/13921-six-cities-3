import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const place = {
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
  "coords": [52.3909553943508, 4.929309666406198],
};

it(`Should title be clicked`, () => {
  const onPlaceTitleClick = jest.fn();
  const onHoverCard = jest.fn();

  const placeCard = shallow(
      <PlaceCard
        place={place}
        onPlaceTitleClick={onPlaceTitleClick}
        onHoverCard={onHoverCard}
      />
  );
  const cardTitle = placeCard.find(`.place-card__name a`);
  cardTitle.props().onClick();

  expect(onPlaceTitleClick).toHaveBeenCalledTimes(1);
});

it(`On hover card must be card's id`, () => {
  const onPlaceTitleClick = jest.fn();
  const onHoverCard = jest.fn();

  const placeCard = shallow(
      <PlaceCard
        place={place}
        onPlaceTitleClick={onPlaceTitleClick}
        onHoverCard={onHoverCard}
      />
  );

  const card = placeCard.find(`.place-card`);
  card.props().onMouseEnter();

  expect(onHoverCard).toBeCalledWith(expect.any(Number));
});

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
    "id": 2,
    "name": `Max`,
    "img": `img/avatar-max.jpg`,
    "isPro": true,
  },
  "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
  "coords": [52.3909553943508, 4.929309666406198],
};

it(`Should title be clicked`, () => {
  const handlePlaceTitleClick = jest.fn();
  const handleCardHover = jest.fn();

  const placeCard = shallow(
      <PlaceCard
        place={place}
        handlePlaceTitleClick={handlePlaceTitleClick}
        handleCardHover={handleCardHover}
      />
  );
  const cardTitle = placeCard.find(`.place-card__name a`);
  cardTitle.props().onClick();

  expect(handlePlaceTitleClick).toHaveBeenCalledTimes(1);
});

it(`On hover card must be card's id`, () => {
  const handlePlaceTitleClick = jest.fn();
  const handleCardHover = jest.fn();

  const placeCard = shallow(
      <PlaceCard
        place={place}
        handlePlaceTitleClick={handlePlaceTitleClick}
        handleCardHover={handleCardHover}
      />
  );

  const card = placeCard.find(`.place-card`);
  card.props().onMouseEnter();
  card.props().onMouseLeave();

  expect(handleCardHover).toBeCalledWith(expect.any(Number));
});

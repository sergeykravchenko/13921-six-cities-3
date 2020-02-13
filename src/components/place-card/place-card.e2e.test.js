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
  "rating": 4,
  "type": `Private room`,
  "isPremium": true,
  "isInBookmark": true
};

it(`Should title be clicked`, () => {
  const onPlaceTitleClick = jest.fn();
  const onHoverCard = jest.fn();

  const placeCard = shallow(
      <PlaceCard
        place={place}
        onPlaceTitleClick={onPlaceTitleClick}
        onHoverCard = {onHoverCard}
      />
  );

  const card = placeCard.find(`.place-card`);
  const cardTitle = placeCard.find(`.place-card__name a`);

  cardTitle.props().onClick();
  card.props().onMouseEnter();

  expect(onPlaceTitleClick).toHaveBeenCalledTimes(1);
  expect(onHoverCard).toHaveBeenCalledTimes(1);
});
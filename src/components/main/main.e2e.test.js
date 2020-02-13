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
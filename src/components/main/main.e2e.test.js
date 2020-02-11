import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const offersCount = 12;
const offersNames = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`
];

it(`Should title link be pressed`, () => {
  const onPlaceTitleClick = jest.fn();

  const main = shallow(
      <Main
        offersCount = {offersCount}
        offersNames = {offersNames}
        onPlaceTitleClick={onPlaceTitleClick}
      />
  );

  const PlaceTitleLinks = main.find(`.place-card__name a`);

  PlaceTitleLinks.forEach((item) =>{
    item.props().onClick();
  });

  expect(onPlaceTitleClick.mock.calls.length).toBe(PlaceTitleLinks.length);
});

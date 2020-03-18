import React from "react";
import renderer from "react-test-renderer";
import data from "../../mocks/offers";
import Map from "./map.jsx";

const string = `className`;
const offers = [
  {
    "coords": [52.3909553943508, 4.85309666406198],
  }, {
    "coords": [52.369553943508, 4.85309666406198],
  }, {
    "coords": [52.3909553943508, 4.929309666406198],
  }, {
    "coords": [52.3809553943508, 4.939309666406198],
  }
];

const activeCity = {
  "name": `Amsterdam`,
  "coords": [52.38333, 4.9],
  "zoom": 14,
};

const hoveredOffer = 2;
const zoom = 15;

it(`Should map render correctly`, () => {
  const tree = renderer
    .create(<Map
      bemBlock={string}
      activeCity={activeCity}
      activeOffer={data[0]}
      hoveredOffer={hoveredOffer}
      offers={offers}
      zoom={zoom}
    />, {
      createNodeMock: () => {
        return document.createElement(`div`);
      }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});

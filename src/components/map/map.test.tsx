import * as React from "react";
import * as renderer from "react-test-renderer";
import Map from "./map";
import offers from "../../mocks/offers";

const string = `className`;

const activeCity = {
  "name": `Amsterdam`,
  "coords": [52.38333, 4.9],
  "zoom": 14,
};

const activeMarker = 2;
const zoom = 15;

it(`Should map render correctly`, () => {
  const tree = renderer
    .create(<Map
      bemBlock={string}
      coords={activeCity.coords}
      activeMarker={activeMarker}
      offers={offers}
      zoom={zoom}
    />, {
      createNodeMock: () => {
        return document.createElement(`div`);
      }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});

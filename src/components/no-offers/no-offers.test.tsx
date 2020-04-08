import * as React from "react";
import * as renderer from "react-test-renderer";
import NoOffers from './no-offers';

const city = {
  "name": `Amsterdam`,
  "coords": [1, 2]
};

describe(`NoOffers`, () => {
  it(`should render NoPlaces correctly`, () => {
    const tree = renderer.create(
        <NoOffers city={city} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

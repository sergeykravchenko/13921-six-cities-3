import React from 'react';
import renderer from 'react-test-renderer';
import NoOffers from './no-offers';

const city = `Amsterdam`;

describe(`NoOffers`, () => {
  it(`should render NoPlaces correctly`, () => {
    const tree = renderer.create(
        <NoOffers city={city} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

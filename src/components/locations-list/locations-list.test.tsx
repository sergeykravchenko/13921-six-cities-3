import * as React from "react";
import * as renderer from "react-test-renderer";
import LocationsList from './locations-list';

const cities = [
  {
    "name": `Amsterdam`,
    "coords": [52.38333, 4.9],
  }, {
    "name": `Paris`,
    "coords": [52.38333, 3.7],
  },
];

const activeCity = cities[0];

it(`Render locations list correctly`, () => {
  const onCityClick = jest.fn();

  const tree = renderer
    .create(
        <LocationsList
          cities={cities}
          activeCity={activeCity}
          onCityClick={onCityClick}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

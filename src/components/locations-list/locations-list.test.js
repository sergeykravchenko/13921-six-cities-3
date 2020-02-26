import React from 'react';
import renderer from 'react-test-renderer';
import LocationsList from './locations-list.jsx';

const cities = [
  {
    "name": `Amsterdam`,
    "coords": [52.38333, 4.9],
  }, {
    "name": `Paris`,
    "coords": [52.38333, 3.7],
  },
];

const activeCity = cities[0].name;

it(`Render locations list correctly`, () => {
  const handleCityClick = jest.fn();

  const tree = renderer
    .create(
        <LocationsList
          cities={cities}
          activeCity={activeCity}
          handleCityClick={handleCityClick}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

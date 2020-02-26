import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LocationsList from './locations-list.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

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

it(`Should title be clicked`, () => {
  const handleCityClick = jest.fn();

  const locationsList = shallow(
      <LocationsList
        cities={cities}
        activeCity={activeCity}
        handleCityClick={handleCityClick}
      />
  );
  const tabsItems = locationsList.find(`.tabs__item`);
  tabsItems.forEach((item) => {
    item.props().onClick();
  });
  expect(handleCityClick.mock.calls.length).toBe(cities.length);
});

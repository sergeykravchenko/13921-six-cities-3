import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import LocationsList from './locations-list';

configure({
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

const activeCity = cities[0];

it(`Should title be clicked`, () => {
  const onCityClick = jest.fn();

  const locationsList = shallow(
      <LocationsList
        cities={cities}
        activeCity={activeCity}
        onCityClick={onCityClick}
      />
  );
  const tabsItems = locationsList.find(`.tabs__item`);
  tabsItems.forEach((item) => {
    item.props().onClick();
  });
  expect(onCityClick.mock.calls.length).toBe(cities.length);
});

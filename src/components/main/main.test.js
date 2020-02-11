import React from 'react';
import Main from './main.jsx';
import renderer from 'react-test-renderer';

const offersCount = 24;
const offersNames = [
  `5 room`,
  `6 room`,
  `7 room`,
  `8 room`
];

it(`Main renders correctly`, () => {
  const tree = renderer
    .create(<Main
      offersCount = {offersCount}
      offersNames = {offersNames}
      onPlaceTitleClick = {() => {}}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

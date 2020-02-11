import React from 'react';
import App from './app.jsx';
import renderer from 'react-test-renderer';

const offersCount = 8;
const offersNames = [
  `1 appartment`,
  `2 appartment`,
  `3 appartment`,
  `4 appartment`
];

it(`App renders correctly`, () => {
  const tree = renderer
    .create(<App
      offersCount = {offersCount}
      offersNames = {offersNames}
      onPlaceTitleClick={()=>{}}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from './app.jsx';
import {getCities} from '../../utils';
import offers from '../../mocks/offers';

const cities = getCities(offers);
const activeCity = cities[0];
const activeOffer = offers[0];
const mockStore = configureStore([]);
const store = mockStore({
  cities,
  activeCity: cities[0],
  offers,
  activeOffer: null,
});

it(`App renders correctly`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            offers={offers}
            cities={cities}
            activeCity={activeCity}
            activeOffer={activeOffer}
            handleCityClick={()=> {}}
            handlePlaceTitleClick={()=>{}}
          />
        </Provider>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }})
    .toJSON();
  expect(tree).toMatchSnapshot();
});

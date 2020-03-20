import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from './app.jsx';
import {getCities} from '../../utils';
import offers from '../../mocks/offers';
import {AuthorizationStatus} from "../../reducer/user/user.js";
import NameSpace from "../../reducer/name-space.js";
import {SortType} from '../../utils';

const cities = getCities(offers);
const activeCity = cities[0];
const activeOffer = offers[0];
const mockStore = configureStore([]);

const activeSortType = `Popular`;
const user = {
  "user": {
    "avatar": `img/1.png`,
    "id": 4,
    "isPro": false,
    "name": `Max`,
  }
};

it(`App renders correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      allOffers: [],
      nearByOffer: offers,
      comments: [],
    },
    [NameSpace.STATE]: {
      activeCity: cities[0],
      activeOffer: null,
      activeMarker: null,
      activeSortType: SortType.POPULAR,
      isFetching: true,
      requestStatus: null,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      user: null,
    }
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            isFetching={true}
            isAuthenticated={AuthorizationStatus.NO_AUTH === `NO_AUTH`}
            offers={offers}
            nearByOffer={offers.slice(0, 10)}
            activeMarker={24}
            cities={cities}
            activeCity={activeCity}
            activeOffer={activeOffer}
            activeSortType={activeSortType}
            handleCityClick={()=> {}}
            handlePlaceTitleClick={()=>{}}
            handleSortTypeClick={()=>{}}
            handleCardHover={()=>{}}
            login={()=>{}}
            user={user}
          />
        </Provider>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }})
    .toJSON();
  expect(tree).toMatchSnapshot();
});

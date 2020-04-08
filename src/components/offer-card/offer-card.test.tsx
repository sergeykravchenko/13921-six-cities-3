import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Router} from "react-router-dom";
import history from "../../history.js";
import NameSpace from "../../reducer/name-space";
import OfferCard from './offer-card';
import offers from '../../mocks/offers';
import {noop} from "../../utils";

const mockStore = configureStore([]);

const offer = {
  "id": 1,
  "name": `Canal View Prinsengracht`,
  "picture": `img/room.jpg`,
  "price": 120,
  "priceText": `night`,
  "rating": 4,
  "zoom": 16,
  "features": {
    "type": `Private room`,
    "bedrooms": 8,
    "maxGuests": 7,
  },
  "isPremium": true,
  "isInBookmark": true,
  "houseHolds": [
    `Wi-Fi`,
    `Washing machine`,
  ],
  "images": [
    `img/apartment-01.jpg`,
    `img/apartment-02.jpg`,
  ],
  "host": {
    "id": 2,
    "name": `Max`,
    "img": `img/avatar-max.jpg`,
    "isPro": true,
  },
  "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
  "coords": [23, 12],
};

const isAuthenticated = false;
const activeMarker = 3;

const activeCity = {
  "name": `Hamburg`,
  "coords": [52.38013, 4.9],
};

const match = {
  params: {
    id: 2,
  }
};

const isFetching = false;

it(`Offer-card renders correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      allOffers: [],
      neighbors: [],
      comments: [],
    },
    [NameSpace.STATE]: {
      requestStatus: ``,
      activeOffer: offer,
    },
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
      user: {
        "avatar_url": `img/1.png`,
        "email": `Oliver.conner@gmail.com`,
        "id": 1,
        "is_pro": false,
        "name": `Oliver.conner`,
      },
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router
            history={history}
          >
            <OfferCard
              isFetching={isFetching}
              offers={offers}
              isAuthenticated={isAuthenticated}
              activeOffer={offer}
              neighbors={offers.slice(0, 2)}
              activeMarker={activeMarker}
              activeCity={activeCity}
              onLoadData={noop}
              match={match}
            />,
          </Router>
        </Provider>, {
          createNodeMock: () => {
            return document.createElement(`div`);
          }})
    .toJSON();
  expect(tree).toMatchSnapshot();
});

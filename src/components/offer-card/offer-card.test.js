import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import OfferCard from './offer-card.jsx';
import offers from '../../mocks/offers';

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
  "gallery": [
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

it(`Offer-card renders correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      allOffers: [],
      nearByOffer: [],
      comments: [],
    },
    [NameSpace.STATE]: {
      requestStatus: ``,
    }
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <OfferCard
            isAuthenticated={isAuthenticated}
            offer={offer}
            nearByOffer={offers.slice(0, 2)}
            activeMarker={activeMarker}
            activeCity={activeCity}
            handlePlaceTitleClick={()=>{}}
            handleCardHover={()=>{}}
          />,
        </Provider>, {
          createNodeMock: () => {
            return document.createElement(`div`);
          }})
    .toJSON();
  expect(tree).toMatchSnapshot();
});

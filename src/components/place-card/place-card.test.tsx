import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {Router} from "react-router-dom";
import history from "../../history";
import PlaceCard from "./place-card";

const mockStore = configureStore([]);

const place = {
  "id": 1,
  "name": `Canal View Prinsengracht`,
  "picture": `img/room.jpg`,
  "price": 120,
  "priceText": `night`,
  "rating": 4,
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
    "id": 12,
    "name": `Max`,
    "img": `img/avatar-max.jpg`,
    "isPro": true,
  },
  "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
  "coords": [52.3809553943508, 4.939309666406198],
};

it(`Render place`, () => {
  const onPlaceTitleClick = jest.fn();
  const onCardHover = jest.fn();
  const onBookmarkStatusChange = jest.fn();

  const store = mockStore({
    [NameSpace.DATA]: {
      allOffers: [],
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router
            history={history}
          >
            <PlaceCard
              place={place}
              onPlaceTitleClick={onPlaceTitleClick}
              onCardHover={onCardHover}
              onBookmarkStatusChange={onBookmarkStatusChange}
            />
          </Router>
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

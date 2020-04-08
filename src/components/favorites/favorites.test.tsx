import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import thunk from 'redux-thunk';
import {Router} from "react-router-dom";
import history from "../../history";
import {Favorites} from "./favorites";
import {Favorite} from "../../types";
import {noop} from "../../utils";

const mockStore = configureStore([thunk]);

const favorites: Favorite[] = [
  {
    'Hamburg': [{
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
        "avatar": `img/avatar-max.jpg`,
        "isPro": true,
      },
      "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      "coords": [23, 12],
    }, {
      "id": 2,
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
        "avatar": `img/avatar-max.jpg`,
        "isPro": true,
      },
      "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      "coords": [25, 13],
    }]
  }
];

it(`Render Favorites`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      allOffers: [],
      favorites: [],
    },
    [NameSpace.USER]: {
      authorizationStatus: ``,
      user: null,
    },
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <Router
            history={history}
          >
            <Favorites
              favorites={favorites}
              onMount={noop}
              onPlaceTitleClick={noop}
            />
          </Router>
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history.js";
import {Favorites} from "./favorites.jsx";

const favorites = [
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
      "coords": [25, 13],
    }]
  }
];

it(`Render Favorites`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Favorites
            favorites={favorites}
            onMount={() => {}}
            handlePlaceTitleClick={() => {}}
          />
        </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

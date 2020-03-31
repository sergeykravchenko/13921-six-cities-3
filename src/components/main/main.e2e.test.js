import React from "react";
import Enzyme, {shallow, mount} from "enzyme";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space.js";
import configureStore from "redux-mock-store";
import {Router} from "react-router-dom";
import history from "../../history.js";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";
import {SortType} from '../../utils';

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

const offers = [
  {
    "id": 1,
    "name": `Canal View Prinsengracht`,
    "picture": `img/room.jpg`,
    "price": 120,
    "priceText": `night`,
    "rating": 4.8,
    "features": {
      "type": `Private room`,
      "bedrooms": 3,
      "maxGuests": 3,
    },
    "isPremium": true,
    "isInBookmark": true,
    "houseHolds": [
      `Wi-Fi`,
      `Washing machine`,
      `Towels`,
      `Heating`,
      `Coffee machine`,
      `Baby seat`,
      `Kitchen`,
      `Dishwasher`,
      `Cabel TV`,
      `Fridge`,
    ],
    "gallery": [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/room.jpg`,
      `img/studio-01.jpg`,
      `img/apartment-03.jpg`,
    ],
    "host": {
      "name": `Max`,
      "img": `img/avatar-max.jpg`,
      "pro": true,
    },
    "description": [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`],
    "coords": [52.3909553943508, 4.853096663406198],
  }, {
    "id": 2,
    "name": `Nice, cozy, warm big bed apartment`,
    "picture": `img/apartment-02.jpg`,
    "price": 80,
    "priceText": `night`,
    "rating": 4,
    "features": {
      "type": `Apartment`,
      "bedrooms": 3,
      "maxGuests": 3,
    },
    "houseHolds": [
      `Wi-Fi`,
      `Washing machine`,
      `Towels`,
      `Heating`,
      `Coffee machine`,
    ],
    "gallery": [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/room.jpg`,
      `img/studio-01.jpg`,
      `img/apartment-03.jpg`,
    ],
    "host": {
      "name": `Angelina`,
      "img": `img/avatar-angelina.jpg`,
      "pro": false,
    },
    "description": [`An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`],
    "coords": [52.3909553943508, 4.83509666406198],
  }, {
    "id": 3,
    "name": `Wood and stone place`,
    "picture": `img/room.jpg`,
    "price": 132,
    "priceText": `night`,
    "rating": 5,
    "features": {
      "type": `Private room`,
      "bedrooms": 4,
      "maxGuests": 3,
    },
    "isPremium": true,
    "houseHolds": [
      `Baby seat`,
      `Kitchen`,
      `Dishwasher`,
      `Cabel TV`,
    ],
    "gallery": [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/room.jpg`,
      `img/studio-01.jpg`,
      `img/apartment-03.jpg`,
    ],
    "host": {
      "name": `Max`,
      "img": `img/avatar-max.jpg`,
      "pro": false,
    },
    "description": [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`],
    "coords": [52.3909553943508, 4.85346666406198],
  }, {
    "id": 4,
    "name": `Beautiful &amp; luxurious apartment at great location`,
    "picture": `img/apartment-01.jpg`,
    "price": 180,
    "priceText": `night`,
    "rating": 4,
    "features": {
      "type": `Apartment`,
      "bedrooms": 5,
      "maxGuests": 3,
    },
    "houseHolds": [
      `Heating`,
      `Coffee machine`,
      `Baby seat`,
      `Kitchen`,
    ],
    "gallery": [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`,
      `img/room.jpg`,
      `img/studio-01.jpg`,
      `img/apartment-03.jpg`,
    ],
    "host": {
      "name": `Angelina`,
      "img": `img/avatar-angelina.jpg`,
      "pro": true,
    },
    "description": [`An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`],
    "coords": [52.3909553943508, 4.85259666406198],
  }
];

const cities = [`Amsterdam`, `Paris`];
const activeCity = {"name": `Amsterdam`, "coords": [222, 333]};
const activeSortType = SortType.POPULAR;
const isFetching = false;

it(`Should title link be pressed`, () => {
  const handlePlaceTitleClick = jest.fn();
  const store = mockStore({
    [NameSpace.DATA]: {
      allOffers: [],
    },
    [NameSpace.STATE]: {
      isFetching: true,
      activeMarker: null,
      activeCity: null,
      activeSortType: null,
    },
  });

  const main = mount(
      <Router
        history={history}
      >
        <Provider store={store}>
          <Main
            isFetching={isFetching}
            offers={offers}
            cities={cities}
            activeCity={activeCity}
            activeSortType={activeSortType}
            handleCityClick={() =>{}}
            handlePlaceTitleClick={() => {}}
            handleSortTypeClick={() => {}}
          />
        </Provider>
      </Router>
  );

  const PlaceTitleLinks = main.find(`.place-card__name a`);

  PlaceTitleLinks.forEach((item) =>{
    item.props().onClick();
  });

  expect(handlePlaceTitleClick.mock.calls.length).toBe(PlaceTitleLinks.length);
});

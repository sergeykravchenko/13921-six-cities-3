import * as React from "react";
import {configure, mount} from "enzyme";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space";
import configureStore from "redux-mock-store";
import {Router} from "react-router-dom";
import history from "../../history";
import * as Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card";

const mockStore = configureStore([]);

configure({adapter: new Adapter()});

const place = {
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
  "images": [
    `img/apartment-01.jpg`,
    `img/apartment-02.jpg`,
    `img/apartment-03.jpg`,
    `img/room.jpg`,
    `img/studio-01.jpg`,
    `img/apartment-03.jpg`,
  ],
  "host": {
    "id": 2,
    "name": `Max`,
    "img": `img/avatar-max.jpg`,
    "isPro": true,
  },
  "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
  "coords": [52.3909553943508, 4.929309666406198],
};

it(`Should title be clicked`, () => {
  const onPlaceTitleClick = jest.fn();
  const onCardHover = jest.fn();
  const store = mockStore({
    [NameSpace.DATA]: {
      allOffers: [],
    },
  });

  const placeCard = mount(
      <Router
        history={history}
      >
        <Provider store={store}>
          <PlaceCard
            place={place}
            onPlaceTitleClick={onPlaceTitleClick}
            onCardHover={onCardHover}
          />
        </Provider>
      </Router>
  );
  const cardTitle = placeCard.find(`.place-card__name a`);
  cardTitle.simulate(`click`);

  expect(onPlaceTitleClick).toHaveBeenCalledTimes(1);
});

it(`On hover card must be card's id`, () => {
  const onPlaceTitleClick = jest.fn();
  const onCardHover = jest.fn();
  const store = mockStore({
    [NameSpace.DATA]: {
      allOffers: [],
    },
  });

  const placeCard = mount(
      <Router
        history={history}
      >
        <Provider store={store}>
          <PlaceCard
            place={place}
            onPlaceTitleClick={onPlaceTitleClick}
            onCardHover={onCardHover}
          />
        </Provider>
      </Router>
  );

  const card = placeCard.find(`.place-card`);
  card.props().onMouseEnter();
  card.props().onMouseLeave();

  expect(onCardHover).toBeCalledWith(expect.any(Number));
});

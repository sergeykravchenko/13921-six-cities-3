import {reducer, ActionCreator, ActionType} from "./reducer.js";
import offers from "./mocks/offers";
import {getCities, getOffersByCity} from './utils';

const cities = getCities(offers);

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    cities,
    activeCity: cities[0],
    offers: getOffersByCity(offers, cities[0].name),
    activeOffer: null,
  });
});

it(`Reducer should update city by a given city`, () => {
  expect(reducer({
    cities,
    activeCity: ``,
    offers,
    activeOffer: null,
  },
  ActionCreator.changeCity(`Paris`)
  )).toEqual({
    cities,
    activeCity: `Paris`,
    offers,
    activeOffer: null,
  });
});

it(`Reducer should get offers by a given city`, () => {
  expect(reducer({
    cities,
    activeCity: ``,
    offers,
    activeOffer: null,
  },
  ActionCreator.getOffers(`Paris`)
  )).toEqual({
    cities,
    activeCity: ``,
    offers: getOffersByCity(offers, `Paris`),
    activeOffer: null,
  });
});

it(`Reducer set active offer `, () => {
  expect(reducer({
    cities,
    activeCity: ``,
    offers,
    activeOffer: null,
  },
  ActionCreator.getActiveOffer(offers[0])
  )).toEqual({
    cities,
    activeCity: ``,
    offers,
    activeOffer: offers[0],
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for change city returns correct action`, () => {
    expect(ActionCreator.changeCity(cities[1])).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: cities[1],
    });
  });

  it(`Action creator for get offers returns correct action`, () => {
    expect(ActionCreator.getOffers(cities[2])).toEqual({
      type: ActionType.GET_OFFERS,
      payload: cities[2],
    });
  });

  it(`Action creator for get active offer returns correct action`, () => {
    expect(ActionCreator.getActiveOffer(offers[0])).toEqual({
      type: ActionType.GET_ACTIVE_OFFER,
      payload: offers[0],
    });
  });

});

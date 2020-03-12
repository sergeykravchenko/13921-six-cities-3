import {reducer, ActionCreator, ActionType} from "./data.js";
import offers from "../../mocks/offers";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    allOffers: [],
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for load offers returns correct action`, () => {
    expect(ActionCreator.loadOffers(offers)).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    });
  });

});

import {reducer, ActionCreator, ActionType} from "./data.js";
import offers from "../../mocks/offers";
const comments = [
  {
    "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    "date": `2019-05-08T14:13:56.569Z`,
    "id": 1,
    "rating": 4,
    "user": {
      "avatar_url": `img/1.png`,
      "id": 4,
      "is_pro": false,
      "name": `Max`
    }
  },
  {
    "comment": `A quiet cozy.`,
    "date": `2019-06-08T14:13:56.569Z`,
    "id": 2,
    "rating": 5,
    "user": {
      "avatar_url": `img/2.png`,
      "id": 4,
      "is_pro": true,
      "name": `Valera`
    }
  }
];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    allOffers: [],
    nearByOffer: [],
    comments: [],
  });
});

it(`Reducer set near by offer `, () => {
  expect(reducer({
    allOffers: [],
    nearByOffer: [],
    comments: [],
  },
  ActionCreator.loadNearByOffer(offers)
  )).toEqual({
    allOffers: [],
    nearByOffer: offers,
    comments: [],
  });
});

it(`Reducer set comments `, () => {
  expect(reducer({
    allOffers: [],
    nearByOffer: [],
    comments: [],
  },
  ActionCreator.loadComments(comments)
  )).toEqual({
    allOffers: [],
    nearByOffer: [],
    comments,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for load offers returns correct action`, () => {
    expect(ActionCreator.loadOffers(offers)).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    });
  });

  it(`Action creator for get comments returns comments`, () => {
    expect(ActionCreator.loadComments(comments)).toEqual({
      type: ActionType.LOAD_COMMENTS,
      payload: comments,
    });
  });

  it(`Action creator for load near by offer work correctly`, () => {
    expect(ActionCreator.loadNearByOffer(offers)).toEqual({
      type: ActionType.LOAD_NEARBY_OFFER,
      payload: offers,
    });
  });

});

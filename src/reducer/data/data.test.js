import {reducer, ActionCreator, ActionType, Operation} from "./data.js";
import {ActionType as stateActionType} from "../state/state.js";
import MockAdapter from "axios-mock-adapter";
import ModelOffer from '../../models/model-offer';
import ModelComment from '../../models/model-comment';
import {createAPI} from "../../api.js";
import offers from "../../mocks/offers";

const api = createAPI(() => {});

const offersFromServer = [
  {
    "bedrooms": 3,
    "city": {
      "location": {
        "latitude": 52.370216,
        "longitude": 4.895168,
        "zoom": 10
      },
      "name": `Amsterdam`
    },
    "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    "host": {
      "avatar_url": `img/1.png`,
      "id": 3,
      "is_pro": true,
      "name": `Angelina`,
    },
    "id": 1,
    "images": [`img/1.png`, `img/2.png`],
    "is_favorite": false,
    "is_premium": false,
    "location": {
      "latitude": 52.35514938496378,
      "longitude": 4.673877537499948,
      "zoom": 8
    },
    "max_adults": 4,
    "preview_image": `img/1.png`,
    "price": 120,
    "rating": 4.8,
    "title": `Beautiful & luxurious studio at great location`,
    "type": `apartment`,
  }
];

const commentsFromServer = [
  {
    "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    "date": `2019-05-08T14:13:56.569Z`,
    "id": 1,
    "rating": 4,
    "user": {
      "avatar_url": `img/1.png`,
      "id": 4,
      "is_pro": false,
      "name": `Max`,
    }
  }
];

const commentData = {
  "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  "rating": 4,
};

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
    neighbors: [],
    comments: [],
    favorites: [],
  });
});

it(`Reducer set near by offer `, () => {
  expect(reducer({
    allOffers: [],
    neighbors: [],
    comments: [],
    favorites: [],
  },
  ActionCreator.loadNeighbors(offers)
  )).toEqual({
    allOffers: [],
    neighbors: offers,
    comments: [],
    favorites: [],
  });
});

it(`Reducer set comments `, () => {
  expect(reducer({
    allOffers: [],
    neighbors: [],
    comments: [],
    favorites: [],
  },
  ActionCreator.loadComments(comments)
  )).toEqual({
    allOffers: [],
    neighbors: [],
    comments,
    favorites: [],
  });
});

it(`Reducer set favorites `, () => {
  expect(reducer({
    allOffers: [],
    neighbors: [],
    comments: [],
    favorites: [],
  },
  ActionCreator.loadFavorites(offers)
  )).toEqual({
    allOffers: [],
    neighbors: [],
    comments: [],
    favorites: offers,
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
    expect(ActionCreator.loadNeighbors(offers)).toEqual({
      type: ActionType.LOAD_NEIGHBORS,
      payload: offers,
    });
  });

  it(`Action creator for load favorites work correctly`, () => {
    expect(ActionCreator.loadFavorites(offers)).toEqual({
      type: ActionType.LOAD_FAVORITES,
      payload: offers,
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, offersFromServer);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        const offersParsed = ModelOffer.parseOffers(offersFromServer);
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: offersParsed,
        });
      });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoritesLoader = Operation.loadFavorites();

    apiMock
      .onGet(`/favorite`)
      .reply(200, offersFromServer);

    return favoritesLoader(dispatch, () => {}, api)
      .then(() => {
        const offersParsed = ModelOffer.parseOffers(offersFromServer);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITES,
          payload: offersParsed,
        });
      });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /hotels/:id/nearby`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const neighborsLoader = Operation.loadNeighbors(1);

    apiMock
      .onGet(`/hotels/1/nearby`)
      .reply(200, offersFromServer);

    return neighborsLoader(dispatch, () => {}, api)
      .then(() => {
        const offersParsed = ModelOffer.parseOffers(offersFromServer);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_NEIGHBORS,
          payload: offersParsed,
        });
      });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /comments/:id`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsLoader = Operation.loadComments(15);

    apiMock
      .onGet(`/comments/15`)
      .reply(200, commentsFromServer);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        const commentsParsed = ModelComment.parseComments(commentsFromServer);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_COMMENTS,
          payload: commentsParsed,
        });
      });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API post request to /comments/:id`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsLoader = Operation.uploadComment(15, commentData);

    apiMock
      .onPost(`/comments/15`)
      .reply(200, commentsFromServer);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        const commentsParsed = ModelComment.parseComments(commentsFromServer);
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: stateActionType.GET_REQUEST_STATUS,
          payload: `WAITING`,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_COMMENTS,
          payload: commentsParsed,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: stateActionType.GET_REQUEST_STATUS,
          payload: `SUCCESS`,
        });
      });
  });
});

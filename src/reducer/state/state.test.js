import {reducer, ActionCreator, ActionType} from "./state.js";
import offers from "../../mocks/offers";
import {getCities, RequestStatus} from "../../utils";

const cities = getCities(offers);

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    activeCity: {},
    activeOffer: null,
    activeMarker: null,
    activeSortType: `Popular`,
    isFetching: true,
    requestStatus: null,
  });
});

it(`Reducer should update city by a given city`, () => {
  expect(reducer({
    activeCity: ``,
    activeOffer: null,
    activeMarker: null,
    activeSortType: `Popular`,
    isFetching: true,
  },
  ActionCreator.getActiveCity(`Paris`)
  )).toEqual({
    activeCity: `Paris`,
    activeOffer: null,
    activeMarker: null,
    activeSortType: `Popular`,
    isFetching: true,
  });
});

it(`Reducer should update fetch status by a given boolean`, () => {
  expect(reducer({
    activeCity: ``,
    activeOffer: null,
    activeMarker: null,
    activeSortType: `Popular`,
    isFetching: true,
    requestStatus: null,
  },
  ActionCreator.changeFetchStatus(false)
  )).toEqual({
    activeCity: ``,
    activeOffer: null,
    activeMarker: null,
    activeSortType: `Popular`,
    isFetching: false,
    requestStatus: null,
  });
});

it(`Reducer should update request status by a given status`, () => {
  expect(reducer({
    activeCity: ``,
    activeOffer: null,
    activeMarker: null,
    activeSortType: `Popular`,
    isFetching: true,
    requestStatus: null,
  },
  ActionCreator.getRequestStatus(RequestStatus.FAILURE)
  )).toEqual({
    activeCity: ``,
    activeOffer: null,
    activeMarker: null,
    activeSortType: `Popular`,
    isFetching: true,
    requestStatus: RequestStatus.FAILURE,
  });
});

it(`Reducer should update active offer by a given value`, () => {
  expect(reducer({
    activeCity: ``,
    activeOffer: null,
    activeMarker: null,
    activeSortType: `Popular`,
    isFetching: true,
  },
  ActionCreator.getActiveOffer(offers[0])
  )).toEqual({
    activeCity: ``,
    activeOffer: offers[0],
    activeMarker: null,
    activeSortType: `Popular`,
    isFetching: true,
  });
});


it(`Reducer should update active marker by a given value`, () => {
  expect(reducer({
    activeCity: ``,
    activeOffer: null,
    activeMarker: null,
    activeSortType: `Popular`,
    isFetching: true,
  },
  ActionCreator.getActiveMarker(2)
  )).toEqual({
    activeCity: ``,
    activeOffer: null,
    activeMarker: 2,
    activeSortType: `Popular`,
    isFetching: true,
  });
});

it(`Reducer should update active sort type by a given value`, () => {
  expect(reducer({
    activeCity: ``,
    activeOffer: null,
    activeMarker: null,
    activeSortType: `Popular`,
    isFetching: true,
  },
  ActionCreator.getActiveSortType(`Price: low to high`)
  )).toEqual({
    activeCity: ``,
    activeOffer: null,
    activeMarker: null,
    activeSortType: `Price: low to high`,
    isFetching: true,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for change fetch status returns correct action`, () => {
    expect(ActionCreator.changeFetchStatus(false)).toEqual({
      type: ActionType.CHANGE_FETCH_STATUS,
      payload: false,
    });
  });

  it(`Action creator for get request status returns correct action`, () => {
    expect(ActionCreator.getRequestStatus(RequestStatus.SUCCESS)).toEqual({
      type: ActionType.GET_REQUEST_STATUS,
      payload: RequestStatus.SUCCESS,
    });
  });

  it(`Action creator for get active offer returns correct action`, () => {
    expect(ActionCreator.getActiveOffer(offers[0])).toEqual({
      type: ActionType.GET_ACTIVE_OFFER,
      payload: offers[0],
    });
  });

  it(`Action creator for get active marker returns correct action`, () => {
    expect(ActionCreator.getActiveMarker(2)).toEqual({
      type: ActionType.GET_ACTIVE_MARKER,
      payload: 2,
    });
  });

  it(`Action creator for get active offer returns correct action`, () => {
    expect(ActionCreator.getActiveSortType(`Popular`)).toEqual({
      type: ActionType.GET_ACTIVE_SORT_TYPE,
      payload: `Popular`,
    });
  });

  it(`Action creator for change city returns correct action`, () => {
    expect(ActionCreator.getActiveCity(cities[1])).toEqual({
      type: ActionType.GET_ACTIVE_CITY,
      payload: cities[1],
    });
  });
});

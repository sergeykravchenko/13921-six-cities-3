import {extend, SortType} from '../../utils';

const initialState = {
  activeCity: {},
  activeOffer: null,
  activeMarker: null,
  activeSortType: SortType.POPULAR,
  isFetching: true,
  requestStatus: null,
};

const ActionType = {
  CHANGE_FETCH_STATUS: `CHANGE_FETCH_STATUS`,
  GET_ACTIVE_OFFER: `GET_ACTIVE_OFFER`,
  GET_ACTIVE_MARKER: `GET_ACTIVE_MARKER`,
  GET_ACTIVE_SORT_TYPE: `GET_ACTIVE_SORT_TYPE`,
  GET_ACTIVE_CITY: `GET_ACTIVE_CITY`,
  GET_REQUEST_STATUS: `GET_REQUEST_STATUS`,
};

const ActionCreator = {
  changeFetchStatus: (bool) => ({
    type: ActionType.CHANGE_FETCH_STATUS,
    payload: bool,
  }),
  getRequestStatus: (status) => ({
    type: ActionType.GET_REQUEST_STATUS,
    payload: status,
  }),
  getActiveOffer: (offer) => ({
    type: ActionType.GET_ACTIVE_OFFER,
    payload: offer,
  }),
  getActiveMarker: (id) => ({
    type: ActionType.GET_ACTIVE_MARKER,
    payload: id,
  }),
  getActiveSortType: (type) => ({
    type: ActionType.GET_ACTIVE_SORT_TYPE,
    payload: type,
  }),
  getActiveCity: (city) => ({
    type: ActionType.GET_ACTIVE_CITY,
    payload: city,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_FETCH_STATUS:
      return extend(state, {isFetching: action.payload});

    case ActionType.GET_REQUEST_STATUS:
      return extend(state, {requestStatus: action.payload});

    case ActionType.GET_ACTIVE_OFFER:
      return extend(state, {activeOffer: action.payload});

    case ActionType.GET_ACTIVE_MARKER:
      return extend(state, {activeMarker: action.payload});

    case ActionType.GET_ACTIVE_SORT_TYPE:
      return extend(state, {activeSortType: action.payload});

    case ActionType.GET_ACTIVE_CITY:
      return extend(state, {activeCity: action.payload});
  }
  return state;
};

export {reducer, ActionType, ActionCreator};

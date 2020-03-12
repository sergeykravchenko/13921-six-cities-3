import {extend, SortType} from '../../utils';

const initialState = {
  activeCity: {},
  activeOffer: null,
  hoveredOffer: null,
  activeSortType: SortType.POPULAR,
  isFetching: true,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_FETCH_STATUS: `CHANGE_FETCH_STATUS`,
  GET_ACTIVE_OFFER: `GET_ACTIVE_OFFER`,
  GET_HOVERED_OFFER: `GET_HOVERED_OFFER`,
  GET_ACTIVE_SORT_TYPE: `GET_ACTIVE_SORT_TYPE`,
  GET_CITIES: `GET_CITIES`,
  GET_ACTIVE_CITY: `GET_ACTIVE_CITY`,
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  changeFetchStatus: (bool) => ({
    type: ActionType.CHANGE_FETCH_STATUS,
    payload: bool,
  }),
  getActiveOffer: (offer) => ({
    type: ActionType.GET_ACTIVE_OFFER,
    payload: offer,
  }),
  getHoveredOffer: (id) => ({
    type: ActionType.GET_HOVERED_OFFER,
    payload: id,
  }),
  getActiveSortType: (type) => ({
    type: ActionType.GET_ACTIVE_SORT_TYPE,
    payload: type,
  }),
  getCities: (array) => ({
    type: ActionType.GET_CITIES,
    payload: array,
  }),
  getActiveCity: (city) => ({
    type: ActionType.GET_ACTIVE_CITY,
    payload: city,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {activeCity: action.payload});

    case ActionType.CHANGE_FETCH_STATUS:
      return extend(state, {isFetching: action.payload});

    case ActionType.GET_ACTIVE_OFFER:
      return extend(state, {activeOffer: action.payload});

    case ActionType.GET_HOVERED_OFFER:
      return extend(state, {hoveredOffer: action.payload});

    case ActionType.GET_ACTIVE_SORT_TYPE:
      return extend(state, {activeSortType: action.payload});

    case ActionType.GET_CITIES:
      return extend(state, {cities: action.payload});

    case ActionType.GET_ACTIVE_CITY:
      return extend(state, {activeCity: action.payload});
  }
  return state;
};

export {reducer, ActionType, ActionCreator};

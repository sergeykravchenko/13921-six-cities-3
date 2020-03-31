import {
  extend,
  RequestStatus,
  AppRoute,
  replaceItem,
  isObjectInArray} from '../../utils';
import ModelOffer from '../../models/model-offer';
import ModelComment from '../../models/model-comment';
import {ActionCreator as stateActionCreator} from '../state/state';
import history from '../../history.js';

const Error = {
  UNAUTHORIZED: 401,
};

const initialState = {
  allOffers: [],
  nearByOffer: [],
  comments: [],
  favorites: [],
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  LOAD_NEARBY_OFFER: `LOAD_NEARBY_OFFER`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
};

const ActionCreator = {
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
  loadComments: (array) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: array,
  }),
  loadNearByOffer: (array) => ({
    type: ActionType.LOAD_NEARBY_OFFER,
    payload: array,
  }),
  loadFavorites: (array) => ({
    type: ActionType.LOAD_FAVORITES,
    payload: array,
  }),
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const offers = ModelOffer.parseOffers(response.data);
        dispatch(ActionCreator.loadOffers(offers));
        dispatch(stateActionCreator.getActiveCity(offers[0].city));
        dispatch(stateActionCreator.changeFetchStatus(false));
      });
  },
  loadFavorites: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        const offers = ModelOffer.parseOffers(response.data);
        dispatch(ActionCreator.loadFavorites(offers));
      });
  },
  loadComments: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        const comments = ModelComment.parseComments(response.data);
        dispatch(ActionCreator.loadComments(comments));
      });
  },
  loadNearByOffer: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`)
      .then((response) => {
        const offers = ModelOffer.parseOffers(response.data);
        dispatch(ActionCreator.loadNearByOffer(offers));
      });
  },
  uploadComment: (id, data) => (dispatch, getState, api) => {
    dispatch(stateActionCreator.getRequestStatus(RequestStatus.WAITING));
    return api.post(`/comments/${id}`, data)
      .then((response) => {
        const comments = ModelComment.parseComments(response.data);
        dispatch(ActionCreator.loadComments(comments));
        dispatch(stateActionCreator.getRequestStatus(RequestStatus.SUCCESS));
      })
      .catch(() => {
        dispatch(stateActionCreator.getRequestStatus(RequestStatus.FAILURE));
      });
  },
  changeBookmarkStatus: (id, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${status}`)
      .then((response) => {
        dispatch(Operation.loadFavorites());
        const offer = ModelOffer.parseOffer(response.data);
        const updatedOffers = replaceItem(offer, getState().DATA.allOffers);
        dispatch(ActionCreator.loadOffers(updatedOffers));

        if (getState().DATA.nearByOffer && isObjectInArray(offer.id, getState().DATA.nearByOffer)) {
          const updatedNearOffers = replaceItem(offer, getState().DATA.nearByOffer);
          dispatch(ActionCreator.loadNearByOffer(updatedNearOffers));
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === Error.UNAUTHORIZED) {
          history.push(AppRoute.LOGIN);
        } else {
          throw err;
        }
      });
  },
  changeBookmarkFromCard: (id, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${status}`)
      .then((response) => {
        if (getState().STATE.activeOffer) {
          const offer = ModelOffer.parseOffer(response.data);
          dispatch(stateActionCreator.getActiveOffer(offer));
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === Error.UNAUTHORIZED) {
          history.push(AppRoute.LOGIN);
        } else {
          throw err;
        }
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {allOffers: action.payload});

    case ActionType.LOAD_NEARBY_OFFER:
      return extend(state, {nearByOffer: action.payload});

    case ActionType.LOAD_COMMENTS:
      return extend(state, {comments: action.payload});

    case ActionType.LOAD_FAVORITES:
      return extend(state, {favorites: action.payload});
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};

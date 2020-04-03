import {
  extend,
  RequestStatus,
  replaceItem,
  isObjectInArray} from '../../utils';
import ModelOffer from '../../models/model-offer';
import ModelComment from '../../models/model-comment';
import {ActionCreator as stateActionCreator} from '../state/state';

const initialState = {
  allOffers: [],
  neighbors: [],
  comments: [],
  favorites: [],
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  LOAD_NEIGHBORS: `LOAD_NEIGHBORS`,
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
  loadNeighbors: (array) => ({
    type: ActionType.LOAD_NEIGHBORS,
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
  loadNeighbors: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`)
      .then((response) => {
        const offers = ModelOffer.parseOffers(response.data);
        dispatch(ActionCreator.loadNeighbors(offers));
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

        if (getState().DATA.neighbors && isObjectInArray(offer.id, getState().DATA.neighbors)) {
          const updatedNearOffers = replaceItem(offer, getState().DATA.neighbors);
          dispatch(ActionCreator.loadNeighbors(updatedNearOffers));
        }
      })
      .catch((err) => {
        throw err;
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
        throw err;
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {allOffers: action.payload});

    case ActionType.LOAD_NEIGHBORS:
      return extend(state, {neighbors: action.payload});

    case ActionType.LOAD_COMMENTS:
      return extend(state, {comments: action.payload});

    case ActionType.LOAD_FAVORITES:
      return extend(state, {favorites: action.payload});
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};

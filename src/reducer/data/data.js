import {extend, RequestStatus} from '../../utils';
import ModelOffer from '../../models/model-offer';
import ModelComment from '../../models/model-comment';
import {ActionCreator as stateActionCreator} from '../state/state';

const initialState = {
  allOffers: [],
  nearByOffer: [],
  comments: [],
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  LOAD_NEARBY_OFFER: `LOAD_NEARBY_OFFER`,
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
  loadComments: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        const comments = ModelComment.parseComments(response.data);
        dispatch(ActionCreator.loadComments(comments));
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
  loadNearByOffer: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`)
      .then((response) => {
        const offers = ModelOffer.parseOffers(response.data);
        dispatch(ActionCreator.loadNearByOffer(offers));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {allOffers: action.payload});

    case ActionType.LOAD_NEARBY_OFFER:
      return extend(state, {nearByOffer: action.payload});

    case ActionType.LOAD_COMMENTS:
      return extend(state, {comments: action.payload});
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};

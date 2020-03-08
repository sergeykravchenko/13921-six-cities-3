import {extend} from '../../utils';
import ModelOffer from '../../models/model-offer';

const initialState = {
  allOffers: [],
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
};

const ActionCreator = {
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const offers = ModelOffer.parseOffers(response.data);
        dispatch(ActionCreator.loadOffers(offers));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        allOffers: action.payload
      });
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};

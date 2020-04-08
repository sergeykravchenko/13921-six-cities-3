import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from './app';
import {AuthorizationStatus} from "../../reducer/user/user";
import NameSpace from "../../reducer/name-space";

const mockStore = configureStore([]);

it(`App renders correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      allOffers: [],
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      user: null,
    },
    [NameSpace.STATE]: {
      isFetching: true,
    },
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            isAuthenticated={AuthorizationStatus.NO_AUTH === `NO_AUTH`}
          />
        </Provider>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }})
    .toJSON();
  expect(tree).toMatchSnapshot();
});

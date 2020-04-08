import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Router} from "react-router-dom";
import history from "../../history";
import NameSpace from "../../reducer/name-space";
import SignIn from "./sign-in";
import {AuthorizationStatus} from "../../reducer/user/user";
import {noop} from '../../utils';


const mockStore = configureStore([]);

const city = {
  "name": `Amsterdam`,
  "coords": [1, 2],
};

it(`Render SignIn`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      user: null,
    },
    [NameSpace.STATE]: {
      activeCity: city,
    },
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <Router
            history={history}
          >
            <SignIn
              city={city}
              onSubmit={noop}
            />
          </Router>
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

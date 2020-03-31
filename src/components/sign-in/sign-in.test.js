import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Router} from "react-router-dom";
import history from "../../history.js";
import NameSpace from "../../reducer/name-space.js";
import SignIn from "./sign-in.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";

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
              onSubmit={() => {}}
            />
          </Router>
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

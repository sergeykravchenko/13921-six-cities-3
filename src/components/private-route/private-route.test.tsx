import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {Router} from "react-router-dom";
import history from "../../history";
import PrivateRoute from "./private-route";
import {noop} from "../../utils";

const mockStore = configureStore([]);
const path = `/favorites`;

it(`Should PrivateRoute render correctly`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router
            history={history}
          >
            <PrivateRoute
              path={path}
              exact
              isAuthenticated={true}
              render={noop}/>
          </Router>
        </Provider>, {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

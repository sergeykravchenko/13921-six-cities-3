import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import Favorites from "./favorites.jsx";
import offers from "../../mocks/offers";

const mockStore = configureStore([]);

it(`Render Favorites`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      allOffers: [],
    },
    [NameSpace.STATE]: {
      favorites: [],
    }
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <Favorites
            favorites={offers}
            handlePlaceTitleClick={() => {}}
          />
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

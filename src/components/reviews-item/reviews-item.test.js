import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import ReviewsItem from "./reviews-item.jsx";
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);
const store = mockStore({
  [NameSpace.DATA]: {
    comments: []
  }
});

const comment = {
  "id": 1,
  "rating": 4,
  "user": {
    "name": `Max`,
    "avatar": `img/avatar-max.jpg`,
  },
  "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
            The building is green and from 18th century.`,
  "date": new Date(`2019-04-8`),
};

it(`Render review item`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <ReviewsItem
            review={comment}
          />
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});


import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import ReviewsList from "./reviews-list.jsx";

const mockStore = configureStore([]);

const isAuthenticated = false;
const id = 3;
const comments = [
  {
    "id": 1,
    "rating": 4,
    "user": {
      "name": `Max`,
      "avatar": `img/avatar-max.jpg`,
    },
    "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
              The building is green and from 18th century.`,
    "date": new Date(`2019-04-07`),
  }, {
    "id": 2,
    "rating": 5,
    "user": {
      "name": `Angelina`,
      "avatar": `img/avatar-Angelina.jpg`,
    },
    "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    "date": new Date(`2019-04-07`),
  },
];

it(`Render review list`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      comments,
    },
    [NameSpace.STATE]: {
      requestStatus: ``,
    }
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <ReviewsList
            isAuthenticated={isAuthenticated}
            id={id}
            comments={comments}
            requestStatus={``}
            onSubmit={()=>{}}
            onRequestStatusReset={()=>{}}
          />
        </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});


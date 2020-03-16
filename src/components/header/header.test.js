import React from "react";
import renderer from "react-test-renderer";
import Header from "./header.jsx";

const user = {
  email: `test@mail.ru`,
  password: `123f4_t`,
};
const isAuthenticated = true;

it(`Render Header`, () => {
  const tree = renderer
    .create(
        <Header
          user={user}
          isAuthenticated={isAuthenticated}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

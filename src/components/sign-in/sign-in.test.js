import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";

const city = {
  "name": `Amsterdam`,
  "coords": [1, 2],
};

it(`Render SignIn`, () => {
  const tree = renderer
    .create(
        <SignIn
          city={city}
          onSubmit={() => {}}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

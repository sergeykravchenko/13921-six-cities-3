import React from "react";
import renderer from "react-test-renderer";
import ReviewsForm from "./reviews-form.jsx";

const id = 1;
const handleSubmit = () => {};

it(`Render review form`, () => {
  const tree = renderer
    .create(
        <ReviewsForm
          id={id}
          onSubmit={handleSubmit}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

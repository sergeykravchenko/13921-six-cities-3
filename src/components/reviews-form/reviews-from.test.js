import React from "react";
import renderer from "react-test-renderer";
import ReviewsForm from "./reviews-form.jsx";

const id = 1;
const requestStatus = `WAITING`;

it(`Render review form`, () => {
  const tree = renderer
    .create(
        <ReviewsForm
          id={id}
          onSubmit={()=>{}}
          requestStatus={requestStatus}
          onRequestReset={()=>{}}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

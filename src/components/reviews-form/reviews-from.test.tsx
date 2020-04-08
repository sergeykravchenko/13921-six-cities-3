import * as React from "react";
import * as renderer from "react-test-renderer";
import ReviewsForm from "./reviews-form";
import {noop} from "../../utils";

const id = 1;
const requestStatus = `WAITING`;

it(`Render review form`, () => {
  const tree = renderer
    .create(
        <ReviewsForm
          id={id}
          onSubmit={noop}
          requestStatus={requestStatus}
          onRequestReset={noop}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

import React from "react";
import renderer from "react-test-renderer";
import ReviewsItem from "./reviews-item.jsx";

const comment = {
  "id": 1,
  "rating": 4,
  "user": {
    "name": `Max`,
    "avatar": `img/avatar-max.jpg`,
  },
  "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
            The building is green and from 18th century.`,
  "date": new Date(`2019-04-07`),
};

it(`Render review item`, () => {
  const tree = renderer
    .create(
        <ReviewsItem
          review={comment}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});


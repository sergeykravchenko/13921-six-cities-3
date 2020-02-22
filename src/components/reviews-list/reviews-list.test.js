import React from "react";
import renderer from "react-test-renderer";
import ReviewsList from "./reviews-list.jsx";


const reviews = [
  {
    "id": 1,
    "author": `Max`,
    "avatar": `img/avatar-max.jpg`,
    "rating": 4,
    "text": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
              The building is green and from 18th century.`,
    "date": new Date(),
  }, {
    "id": 2,
    "author": `Angelina`,
    "avatar": `img/avatar-angelina.jpg`,
    "rating": 4.5,
    "text": `Picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    "date": new Date(),
  }
];

it(`Render review item`, () => {
  const tree = renderer
    .create(
        <ReviewsList
          reviews={reviews}
        />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});


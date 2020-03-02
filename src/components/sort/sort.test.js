import React from "react";
import renderer from "react-test-renderer";
import Sort from "./sort.jsx";

const activeSortType = `Popular`;

it(`Should Sort  render correctly`, () => {
  const tree = renderer
    .create(<Sort
      activeSortType={activeSortType}
      handleSortTypeClick={()=>{}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

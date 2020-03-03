import React from "react";
import renderer from "react-test-renderer";
import Sort from "./sort.jsx";
import {SortType} from '../../utils';

const activeSortType = SortType.POPULAR;

it(`Should Sort render correctly`, () => {
  const tree = renderer
    .create(<Sort
      activeSortType={activeSortType}
      isOpened={false}
      handleSortTypeClick={() => {}}
      handleToggleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

import * as React from "react";
import * as renderer from "react-test-renderer";
import Sort from "./sort";
import {SortType, noop} from '../../utils';

const activeSortType = SortType.POPULAR;

it(`Should Sort render correctly`, () => {
  const tree = renderer
    .create(<Sort
      activeSortType={activeSortType}
      isChecked={false}
      onSortTypeClick={noop}
      onToggleClick={noop}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

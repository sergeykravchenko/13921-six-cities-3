import * as React from "react";
import {SortType} from "../../utils";

interface Props {
  activeSortType: string;
  onSortTypeClick: (item: string) => void;
  isChecked: boolean;
  onToggleClick: () => void;
}

const Sort: React.FC<Props> = (props: Props) => {
  const {activeSortType, onSortTypeClick, isChecked, onToggleClick} = props;
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        onClick={onToggleClick}
        className="places__sorting-type"
        tabIndex={0}>
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>

      <ul className={`places__options ${isChecked ? `  places__options--opened` : ``} places__options--custom`}>
        {Object.values(SortType).map((item: string, i) => (
          <li key={i} onClick={() => {
            onSortTypeClick(item);
            onToggleClick();
          }}
          className={`places__option ${item === activeSortType ? `places__option--active` : ``}`}
          tabIndex={0}>
            {item}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default React.memo(Sort);

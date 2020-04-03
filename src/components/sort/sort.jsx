import React from "react";
import PropTypes from "prop-types";
import {SortType} from "../../utils";

const Sort = (props) => {
  const {activeSortType, onSortTypeClick, isChecked, onToggleClick} = props;
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        onClick={onToggleClick}
        className="places__sorting-type"
        tabIndex="0">
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>

      <ul className={`places__options ${isChecked ? `  places__options--opened` : ``} places__options--custom`}>
        {Object.values(SortType).map((item, i) => (
          <li key={i} onClick={() => {
            onSortTypeClick(item);
            onToggleClick();
          }}
          className={`places__option ${item === activeSortType ? `places__option--active` : ``}`}
          tabIndex="0">
            {item}
          </li>
        ))}
      </ul>
    </form>
  );
};

Sort.propTypes = {
  activeSortType: PropTypes.string,
  isChecked: PropTypes.bool,
  onToggleClick: PropTypes.func.isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
};

export default React.memo(Sort);

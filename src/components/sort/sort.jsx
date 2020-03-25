import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {SortType} from "../../utils";

class Sort extends PureComponent {
  render() {
    const {activeSortType, handleSortTypeClick, isChecked, handleToggleClick} = this.props;
    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by </span>
        <span
          onClick={handleToggleClick}
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
              handleSortTypeClick(item);
              handleToggleClick();
            }}
            className={`places__option ${item === activeSortType ? `places__option--active` : ``}`}
            tabIndex="0">
              {item}
            </li>
          ))}
        </ul>
      </form>
    );
  }
}

Sort.propTypes = {
  activeSortType: PropTypes.string,
  isChecked: PropTypes.bool,
  handleToggleClick: PropTypes.func.isRequired,
  handleSortTypeClick: PropTypes.func.isRequired,
};

export default Sort;

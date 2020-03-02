import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {SortType} from "../../utils";

class Sort extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: false,
    };

    this._handleSortClick = this._handleSortClick.bind(this);
  }

  _handleSortClick() {
    this.setState({
      isOpened: !this.state.isOpened,
    });
  }

  render() {
    const {activeSortType, handleSortTypeClick} = this.props;
    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by </span>
        <span
          onClick={this._handleSortClick}
          className="places__sorting-type"
          tabIndex="0">
          {activeSortType}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select" />
          </svg>
        </span>

        <ul className={`places__options ${this.state.isOpened ? `  places__options--opened` : ``} places__options--custom`}>
          {Object.values(SortType).map((item, i) => (
            <li key={i} onClick={() => {
              handleSortTypeClick(item);
              this._handleSortClick();
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
  activeSortType: PropTypes.string.isRequired,
  handleSortTypeClick: PropTypes.func.isRequired,
};

export default Sort;

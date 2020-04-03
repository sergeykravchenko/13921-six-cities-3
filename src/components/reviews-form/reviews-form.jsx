import React, {PureComponent} from "react";
import withRatingValues from "../../hocs/with-rating-values/with-rating-values.jsx";
import PropTypes from "prop-types";
import {RequestStatus} from "../../utils";

const COMMENT_MIN_LENGTH = 50;
const COMMENT_MAX_LENGTH = 300;
const STARS_NUM = 5;

class ReviewsForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidUpdate() {
    const {onReset, requestStatus, onRequestReset} = this.props;
    if (requestStatus === RequestStatus.SUCCESS) {
      onReset();
      onRequestReset();
    }
  }

  handleFormSubmit(evt) {
    evt.preventDefault();
    const {id, rating, comment, onSubmit} = this.props;
    onSubmit(id, {
      rating,
      comment,
    });
  }

  handleError() {
    return <strong style={{display: `block`, color: `#ff0000`, marginBottom: `20px`}}>Что-то пошло не так, попробуйте еще раз</strong>;
  }

  _createRating() {
    const {rating, onRatingChange} = this.props;
    return [...Array(STARS_NUM).keys()].map((i) => ++i).reverse().map((value) => {
      return (
        <React.Fragment key={`id-${value}`}>
          <input className="form__rating-input visually-hidden"
            name="rating"
            value={value}
            id={`${value}-stars`}
            type="radio"
            checked={rating === value}
            onChange={onRatingChange}
          />
          <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>
        </React.Fragment>
      );
    });
  }

  _isValidate() {
    const {comment, rating} = this.props;
    return !rating
      || comment.length < COMMENT_MIN_LENGTH
      || comment.length > COMMENT_MAX_LENGTH
      ? true : false;
  }

  render() {
    const {comment, onCommentChange, requestStatus} = this.props;
    return (
      <form className="reviews__form form" action="#" method="post"
        disabled={requestStatus && requestStatus === RequestStatus.WAITING}
        onSubmit={this.handleFormSubmit}
      >
        {requestStatus === RequestStatus.FAILURE && this.handleError() || ``}
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {this._createRating()}
        </div>
        <textarea className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          value={comment}
          onChange={onCommentChange}
        />
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button"
            type="submit"
            disabled={this._isValidate()}
          >Submit</button>
        </div>
      </form>
    );
  }
}

ReviewsForm.propTypes = {
  id: PropTypes.number,
  comment: PropTypes.string,
  onCommentChange: PropTypes.func,
  rating: PropTypes.number,
  onRatingChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  requestStatus: PropTypes.string,
  onRequestReset: PropTypes.func,
};

export default withRatingValues(ReviewsForm);

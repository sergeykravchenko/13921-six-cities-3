import React from "react";
import PropTypes from "prop-types";

const MONTHS = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

const ReviewsItem = (props) => {
  const {review} = props;
  const {author, avatar, rating, text, date} = review;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatar} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {author}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${rating < 5 ? Math.floor(rating) * 20 : 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {text}
        </p>
        <time className="reviews__time" dateTime={date.toISOString().slice(0, 10)}>
          {MONTHS[date.getMonth()]} {date.getFullYear()}
        </time>
      </div>
    </li>
  );
};

ReviewsItem.propTypes = {
  review: PropTypes.exact({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
  })
};

export default ReviewsItem;

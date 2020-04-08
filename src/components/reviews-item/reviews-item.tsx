import * as React from "react";
import {Comment} from "../../types";

interface Props {
  review: Comment;
}

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

const ReviewsItem: React.FC<Props> = (props: Props) => {
  const {review} = props;
  const {user, rating, comment, date} = review;
  const {name, avatar} = user;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatar} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {name}
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
          {comment}
        </p>
        <time className="reviews__time" dateTime={date.toISOString().slice(0, 10)}>
          {MONTHS[date.getMonth()]} {date.getFullYear()}
        </time>
      </div>
    </li>
  );
};

export default ReviewsItem;

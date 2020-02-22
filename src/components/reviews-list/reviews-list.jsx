import React from "react";
import PropTypes from "prop-types";
import ReviewsItem from "../reviews-item/reviews-item.jsx";

const ReviewsList = (props) => {
  const {reviews} = props;
  return (
    <React.Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews && reviews.length || 0}</span></h2>
      <ul className="reviews__list">
        {reviews && reviews.map((review) => (
          <ReviewsItem key={review.id} review={review}/>
        ))}
      </ul>
    </React.Fragment>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.array,
};

export default ReviewsList;

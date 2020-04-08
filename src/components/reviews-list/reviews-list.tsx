import * as React from "react";
import {connect} from 'react-redux';
import {Operation} from "../../reducer/data/data";
import {ActionCreator} from "../../reducer/state/state";
import {getComments} from "../../reducer/data/selectors";
import {getRequestStatus} from "../../reducer/state/selectors";
import ReviewsItem from "../reviews-item/reviews-item";
import ReviewsForm from "../reviews-form/reviews-form";
import {id as idType, Comment} from "../../types";

interface Props {
  id: idType;
  comments: Comment[];
  isAuthenticated: boolean;
  requestStatus: boolean;
  onSubmit: () => void;
  onRequestStatusReset: () => void;
}

const MAX_COMMENTS = 10;

const ReviewsList: React.FC<Props> = (props: Props) => {
  const {
    id,
    comments,
    isAuthenticated,
    requestStatus,
    onSubmit,
    onRequestStatusReset} = props;
  return (
    <React.Fragment>
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">
          {comments.length > 0 && comments.length || 0}
        </span>
      </h2>
      <ul className="reviews__list">
        {comments.length > 0 && comments
          .slice(-MAX_COMMENTS)
          .sort((a, b) => +b.date - +a.date)
          .map((comment) => (
            <ReviewsItem key={comment.id} review={comment}/>
          ))}
      </ul>
      {isAuthenticated &&
      <ReviewsForm
        id={id}
        requestStatus={requestStatus}
        onSubmit={onSubmit}
        onRequestReset={onRequestStatusReset}
      />}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  comments: getComments(state),
  requestStatus: getRequestStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(id, data) {
    dispatch(Operation.uploadComment(id, data));
  },
  onRequestStatusReset() {
    dispatch(ActionCreator.getRequestStatus(null));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsList);

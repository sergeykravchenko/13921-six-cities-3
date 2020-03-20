import React, {PureComponent} from "react";

const withRatingValues = (Component) => (
  class WithRatingValues extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: null,
        comment: ``,
      };

      this.handleRatingChange = this.handleRatingChange.bind(this);
      this.handleCommentChange = this.handleCommentChange.bind(this);
      this.handleReset = this.handleReset.bind(this);
    }

    handleRatingChange(evt) {
      this.setState({rating: Number(evt.target.value)});
    }

    handleCommentChange(evt) {
      this.setState({comment: evt.target.value});
    }

    handleReset() {
      this.setState({
        rating: null,
        comment: ``,
      });
    }

    render() {
      return (
        <Component {...this.props}
          rating={this.state.rating}
          comment={this.state.comment}
          onCommentChange={this.handleCommentChange}
          onRatingChange={this.handleRatingChange}
          onReset={this.handleReset}
        />
      );
    }
  }
);

export default withRatingValues;

import * as React from "react";
import {Subtract} from "utility-types";

interface State {
  rating: number;
  comment: string;
}

interface InjectedProps {
  onCommentChange: (evt: object) => void;
  onRatingChange: (evt: object) => void;
  onReset: () => void;
}

const withRatingValues = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;
  class WithRatingValues extends React.PureComponent<T, State> {
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

  return WithRatingValues;
};

export default withRatingValues;

import * as React from "react";
import {Subtract} from "utility-types";

interface State {
  isChecked: boolean;
}

interface InjectedProps {
  onToggleClick: () => void;
}

const withToggle = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;
  class WithToggle extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        isChecked: false,
      };

      this._handleToggleClick = this._handleToggleClick.bind(this);
    }

    _handleToggleClick() {
      this.setState({
        isChecked: !this.state.isChecked,
      });
    }
    render() {
      const {isChecked} = this.state;
      return (
        <Component
          {...this.props}
          isChecked={isChecked}
          onToggleClick={this._handleToggleClick}
        />
      );
    }
  }
  return WithToggle;
};

export default withToggle;

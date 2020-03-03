import React from 'react';

const withToggle = (Component) => {
  class WithToggle extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isOpened: false,
      };

      this._handleToggleClick = this._handleToggleClick.bind(this);
    }

    _handleToggleClick() {
      this.setState({
        isOpened: !this.state.isOpened,
      });
    }
    render() {
      const {isOpened} = this.state;
      return (
        <Component
          {...this.props}
          isOpened={isOpened}
          handleToggleClick={this._handleToggleClick}
        />
      );
    }
  }
  return WithToggle;
};

export default withToggle;

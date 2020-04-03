import React from 'react';

const withToggle = (Component) => {
  class WithToggle extends React.PureComponent {
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

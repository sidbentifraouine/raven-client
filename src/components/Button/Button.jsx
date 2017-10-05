import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import theme from './theme.css';

class Button extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'button',
      'submit',
    ]),
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    type: 'button',
    disabled: false,
  };

  render() {
    const { type, title, disabled, onClick, ...other } = this.props;

    return (
      <button
        type={type}
        disabled={disabled}
        className={theme.button}
        onClick={onClick}
        {...other}
      >
        {title}
      </button>
    );
  }
}

export default Button;

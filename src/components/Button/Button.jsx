import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import styleVariables from '../../constants/styles'

const StyledButton = styled.button`
  font-family: ${styleVariables.preferredFont};
  font-size: ${styleVariables.fontSizeNormal};
  font-weight: ${styleVariables.fontWeightNormal};
  cursor: pointer;
  width: 100%;
  padding: 10px 15px;
  border: 0;
  background: #509EE3;
  border-radius: 3px;
  color: #fff;

  &:focus {
    outline: none;
  }
`

class Button extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'button',
      'submit'
    ]),
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    type: 'button',
    disabled: false
  };

  render () {
    const { type, title, disabled, onClick, ...other } = this.props

    return (
      <StyledButton
        type={type}
        disabled={disabled}
        onClick={onClick}
        {...other}
      >
        {title}
      </StyledButton>
    )
  }
}

export default Button

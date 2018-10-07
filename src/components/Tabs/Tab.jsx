import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TabContainer = styled.div`
  color: ${props => props.active
    ? props.theme.colors.white
    : props.theme.colors.lightGray};
  font-size: ${props => props.theme.fontSizes.normal};
  font-weight: ${props => props.theme.fontWeights.thin};
  line-height: 1;
  padding: 5px 15px;
  position: relative;
  cursor: ${props => !props.disabled ? 'pointer' : 'default'};
  opacity: ${props => props.disabled ? '0.5' : '1'};
`

class Tab extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.node,
    index: PropTypes.number,
    label: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    active: false,
    className: '',
    disabled: false,
    onClick: () => {}
  }

  handleClick = (event) => {
    if (!this.props.disabled) {
      this.props.onClick(event, this.props.index)
    }
  }

  render () {
    const { active, icon, label, children, disabled } = this.props

    return (
      <TabContainer
        active={active}
        disabled={disabled}
        onClick={this.handleClick}
      >
        {icon}
        {label}
        {children}
      </TabContainer>
    )
  }
}

export default Tab

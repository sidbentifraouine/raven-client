import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TabContentContainer = styled.div`
  display: ${props => props.active ? 'flex' : 'none'};
  flex-direction: column;
  overflow: hidden;
  padding: 5px 15px;
  position: relative;
`

class TabContent extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string
  }

  static defaultProps = {
    active: false,
    className: ''
  }

  render () {
    const { active, className, children } = this.props

    return (
      <TabContentContainer
        active={active}
        className={className}
      >
        {children}
      </TabContentContainer>
    )
  }
}

export default TabContent

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Tab from './Tab'
import TabContent from './TabContent'

const TabsContainer = styled.div`
  position: relative;
`

const Navigation = styled.div`
  display: flex;
  flex: 1;
`

const isComponentOfType = (type, component) => component && component.type === type

class Tabs extends Component {
  static propTypes = {
    index: PropTypes.number,
    children: PropTypes.node,
    className: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {
    index: 0,
    onChange: () => {}
  }

  handleHeaderClick = (index) => {
    this.props.onChange(index)
  }

  filterContent = () => {
    const headers = []
    const contents = []

    React.Children.forEach(this.props.children, (child) => {
      if (isComponentOfType(Tab, child)) {
        headers.push(child)

        if (child.props.children) {
          contents.push(<TabContent>{child.props.children}</TabContent>)
        }
      } else if (isComponentOfType(TabContent, child)) {
        contents.push(child)
      }
    })

    return { headers, contents }
  }

  renderHeaders = (headers) => (
    headers.map((header, index) => React.cloneElement(header, {
      index,
      children: null,
      key: index,
      active: this.props.index === index,
      onClick: (event, index) => {
        this.handleHeaderClick(index)
        if (header.props.onClick) {
          header.props.onClick(event)
        }
      }
    }))
  )

  renderContents = (contents) => (
    contents.map((content, index) => React.cloneElement(content, {
      key: index,
      active: this.props.index === index,
      tabIndex: index
    }))
  )

  render () {
    const { headers, contents } = this.filterContent()

    return (
      <TabsContainer>
        <Navigation>
          {this.renderHeaders(headers)}
        </Navigation>
        {this.renderContents(contents)}
      </TabsContainer>
    )
  }
}

export default Tabs

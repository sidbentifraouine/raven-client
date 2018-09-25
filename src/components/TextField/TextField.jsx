import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import theme from './theme.css'

class TextField extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    placeholder: 'Type something'
  };

  handleChange = (event) => {
    this.props.onChange(event.target.value)
  };

  render () {
    return (
      <div className={theme.textField}>
        <input
          className={theme.input}
          value={this.props.value}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
        />
      </div>
    )
  }
}

export default TextField

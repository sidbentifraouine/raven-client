import React, { PureComponent } from 'react'
import styled from 'styled-components'
import TextField from '../TextField'
import Button from '../Button'

const LoginContainer = styled.div`
  position: relative;
`

class Login extends PureComponent {
  state = {
    room: ''
  };

  handleChange = (value) => {
    this.setState({ room: value })
  };

  handleEnterClick = () => {
    this.props.history.push(`/room/${this.state.room}`)
  };

  render () {
    return (
      <LoginContainer>
        <TextField
          value={this.state.room}
          placeholder='Please enter room id'
          onChange={this.handleChange}
        />
        <Button
          title='Enter'
          onClick={this.handleEnterClick}
          disabled={!this.state.room}
        />
      </LoginContainer>
    )
  }
}

export default Login

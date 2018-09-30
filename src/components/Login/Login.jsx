import React, { PureComponent } from 'react'
import styled from 'styled-components'
import TextField from '../TextField'
import Button from '../Button'
import history from '../../services/history'

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
    history.push(`/${this.state.room}`)
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

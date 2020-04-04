import React, { Component } from 'react'
import Routes from './Routes/routes'
import Container from './Container/container'

class App extends Component {
  render() {
    return (
      <div>
        <Container>
          <Routes />
        </Container>
      </div>
    )
  }
}

export default App

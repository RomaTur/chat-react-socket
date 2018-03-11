import React, { Component } from 'react'
import './App.css'
import Header from '../Header'
import Chat from '../Chat'

class App extends Component {
  constructor() {
    super()
    this.state = {
      projectsName: 'Chat',
      temp: false,
      formMsg: ''
    }
  }

  render() {
    return (
      <div className='App'>
        <Header
          projectsName={this.state.projectsName}
        />
        <Chat />
      </div>
    )
  }
}

export default App

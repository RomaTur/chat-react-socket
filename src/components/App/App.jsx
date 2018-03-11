import React, { Component } from 'react'
import './App.css'
import './iPhone.css'
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
        <div className='iphone-body'>
          <div className='burst' />
          <div className='camera-1' />
          <div className='camera-2' />
          {/* <div className="iphone-screen">
            <div className="banner"></div>
            <div className="content"></div>
            <div className="content-break"></div>
            <div className="content"></div>
            <div className="content-photo"></div>
            <div className="content-break"></div>
            <div className="content"></div>
          </div>	 */}
          <div className='iphone-screen'>
            <Chat />
          </div>
        </div>
      </div>
    )
  }
}

export default App

import React, { Component } from 'react'
import './App.css'
import Header from '../Header'
import Chat from '../Chat'
import socketIOClient from 'socket.io-client'

class App extends Component {
  constructor() {
    super()
    this.state = {
      projectsName: 'Temperature + Joystick + Chat',
      temp: false,
      host: window.location.hostname + ':' + '4000',
      Xin: false,
      Yin: false,
      city: false,
      Bin: 0,
      formMsg: ''
    }
  }

  componentDidMount() {
    const { host } = this.state
    const socket = socketIOClient(host)

    socket.on('FromAPI', data => {
      if (data.name) {
        if (data.name === 'Joystick') {
          this.setState({
            Xin: data.Xin,
            Yin: data.Yin
          })
        }
        if (data.name === 'wheather') {
          this.setState({
            temp: data.temp,
            city: data.city
          })
        }
        if (data.name === 'button') {
          this.setState({
            Bin: data.Bin
          })
        }
      }
      // console.log(data)
    })
  }

  setVal(event) {
    this.setState({
      formMsg: event.target.value
    })
  }

  sendMsg(event) {
    event.preventDefault()

    const { host } = this.state
    const socket = socketIOClient(host)

    socket.send(this.state.formMsg)

    this.setState({
      formMsg: ''
    })
  }

  render() {
    return (
      <div className='App'>
        <Header
          projectsName={this.state.projectsName}
        />
        <div className='App-temp' >
          {(this.state.temp !== false)
            ? <p>
                The temperature in {this.state.city} is: {this.state.temp} °C
            </p>
            : <p>Loading...</p>}
        </div>
        <div className='App-joy' >
          {(this.state.Xin !== false)
            ? <div className='App-joy__wrapper'>
              <div className='App-joy__val'>Xin: {this.state.Xin}</div>
              <div className='App-joy__val'>Yin: {this.state.Yin}</div>
              <div className='App-joy__val'>Bin: {this.state.Bin}</div>
            </div>
            : <p>Loading...</p>}
        </div>
        <Chat />
      </div>
    )
  }
}

export default App

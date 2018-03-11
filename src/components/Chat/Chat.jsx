import React, { Component } from 'react'
import './Chat.css'
import socketIOClient from 'socket.io-client'
import arrow from './arrow.svg'

class Chat extends Component {
  constructor() {
    super()
    this.state = {
      host: window.location.hostname + ':4000',
      formMsg: '',
      messages: [
        {
          id: 1,
          from: 'self',
          text: 'Привет)'
        },
        {
          id: 2,
          from: 'noself',
          text: 'Привет)'
        },
        {
          id: 3,
          from: 'self',
          text: 'Что сегодня делаешь? просто сегодня премьера прикольного фильма, поэтому приглашаю тебя составить мне компанию'
        },
        {
          id: 4,
          from: 'noself',
          text: 'У меня нет шансов отказаться)'
        }
      ],
      selfMessages: [1,3]
    }
  }

  componentDidMount() {
    const { host } = this.state
    const socket = socketIOClient(host)

    socket.on('message', (data) => {
      const currentArr = new Array(this.state.messages)[0]
      const lastId = currentArr[currentArr.length - 1].id

      const nextMsg = {
        id: lastId + 1,
        text: data
      }

      if (this.state.selfMessages[this.state.selfMessages.length - 1] === lastId) {
        nextMsg.from = 'self'
      } else {
        nextMsg.from = 'noself'
      }

      currentArr.push(nextMsg)
      this.setState({
        messages: currentArr
      })
    })
  }

  setVal(event) {
    this.setState({
      formMsg: event.target.value
    })
  }

  sendMsg(event) {
    event.preventDefault()
    if (this.state.formMsg === '') {
      console.log('поле не заполнено')
      return
    }

    const lastId = this.state.messages[this.state.messages.length - 1].id
    const selfIdArr = new Array(this.state.selfMessages)[0]

    selfIdArr.push(lastId)
    this.setState({
      selfMessages: selfIdArr
    })

    const { host } = this.state
    const socket = socketIOClient(host)

    socket.send(this.state.formMsg)
    this.setState({
      formMsg: ''
    })
  }

  render() {
    const messagesArr = []

    this.state.messages.forEach(message => {
      const nameOfClass = `chat__messages-msg chat__messages-msg--${message.from}`

      messagesArr.push(
        <div className={nameOfClass} key={message.id} >
          {message.text}
        </div>
      )
    })

    return (
      <div className='App-chat'>
        <div className='chat'>
          <div className='chat__messages'>
            { messagesArr }
          </div>
          <form  onSubmit={this.sendMsg.bind(this)} className='chat__form'>
            <input type='text' placeholder='Напишите сообщение...' className='chat__form-input'
              value={this.state.formMsg}
              onChange={this.setVal.bind(this)}
            />
            <button type='submit' className='chat__form-submit'
              onClick={this.sendMsg.bind(this)}
            >
              <img src={arrow} className='submit-icon' alt='submit-icon' />
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Chat

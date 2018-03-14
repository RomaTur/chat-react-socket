import React, { Component } from 'react'
import propTypes from 'prop-types'
import '../Chat.css'
import socketIOClient from 'socket.io-client'

class Messages extends Component {
  componentDidMount() {
    const { host } = this.props
    const socket = socketIOClient(host)

    const messagesDiv = document.getElementsByClassName('chat__messages')[0]

    messagesDiv.scrollTop = messagesDiv.scrollHeight

    socket.on('message', (data) => {
      const currentArr = new Array(this.props.messages)[0]
      const lastId = currentArr[currentArr.length - 1].id

      const nextMsg = {
        id: lastId + 1,
        text: data
      }

      currentArr.push(nextMsg)
      this.setState({
        messages: currentArr
      })
    })
  }

  componentDidUpdate() {
    const messagesDiv = document.getElementsByClassName('chat__messages')[0]
    this.chatHeight = document.getElementsByClassName('App-chat')[0].clientHeight
    const inputHeight = document.getElementsByClassName('chat__form')[0].clientHeight
    const messagesHeight = document.getElementsByClassName('chat__messages')[0]

    messagesDiv.scrollTop = messagesDiv.scrollHeight
  }

  render() {
    const messagesArr = []

    this.props.messages.forEach(message => {
      let nameOfClass = ''

      if (this.props.selfMessages.some((elem) => elem === message.id)) {
        nameOfClass = 'chat__messages-msg chat__messages-msg--self'
      } else {
        nameOfClass = 'chat__messages-msg chat__messages-msg--noself'
      }

      messagesArr.push(
        <div className={nameOfClass} key={message.id} >
          {message.text}
        </div>
      )
    })

    return (
      <div className='chat__messages' id='chat__messages'
        style={{ height: this.props.messagesHeight }}
      >
        { messagesArr }
      </div>
    )
  }
}

Messages.propTypes = {
  messages: propTypes.array.isRequired,
  selfMessages: propTypes.array.isRequired,
  host: propTypes.string,
  messagesHeight: propTypes.number
}

export default Messages

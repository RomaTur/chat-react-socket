import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
import TextareaAutosize from 'react-autosize-textarea'
import propTypes from 'prop-types'
import '../Chat.css'
import socketIOClient from 'socket.io-client'
import arrow from './arrow.svg'

class Input extends Component {
  constructor() {
    super()
    this.state = {
      formMsg: ''
    }
  }

  setVal(event) {
    this.setState({
      formMsg: event.target.value
    })
    const chatHeight = document.getElementsByClassName('App-chat')[0].clientHeight
    const inputHeight = document.getElementsByClassName('chat__form')[0].clientHeight
    const messagesDiv = document.getElementsByClassName('chat__messages')
    
    this.setState({
      messagesHeight: chatHeight - inputHeight - 10
    })
  }

  sendMsg(event) {
    event.preventDefault()
    if (this.state.formMsg === '') {
      console.log('поле не заполнено')
      return
    }
    
    const lastId = this.props.messages[this.props.messages.length - 1].id + 1
    const selfIdArr = new Array(this.props.selfMessages)[0]

    selfIdArr.push(lastId)
    this.setState({
      selfMessages: selfIdArr
    })

    const { host } = this.props
    const socket = socketIOClient(host)

    socket.send(this.state.formMsg)
    this.setState({
      formMsg: ''
    })
  }

  textAreaResize() {
    // const chatHeight = document.getElementsByClassName('App-chat')[0].clientHeight
    // const inputHeight = document.getElementsByClassName('chat__form')[0].clientHeight
    // const messagesDiv = document.getElementsByClassName('chat__messages')
    
    // console.log(messagesDiv)
    // this.setState({
    //   messagesHeight: chatHeight - inputHeight - 10
    // })
    this.props.changeMsgHeight()
  }

  render() {
    return (
      <form  onSubmit={this.sendMsg.bind(this)} className='chat__form'>
        <TextareaAutosize placeholder='Напишите сообщение...' className='chat__form-input'
          rows={1}
          maxRows={3}
          onResize={this.textAreaResize.bind(this)}
          value={this.state.formMsg}
          onChange={this.setVal.bind(this)}
        />
        <button type='submit' className='chat__form-submit'
          onClick={this.sendMsg.bind(this)}
        >
          <img src={arrow} className='submit-icon' alt='submit-icon' />
        </button>
      </form>
    )
  }
}

Input.propTypes = {
  messages: propTypes.array,
  selfMessages: propTypes.array,
  host: propTypes.string,
  inputHeight: propTypes.number,
  messagesHeight: propTypes.number,
  changeMsgHeight: propTypes.func
}

export default Input

import React, { Component } from 'react'
import './Chat.css'
import './iPhone.css'
import Input from './Input'
import Messages from './Messages'
import config from '../../config.json'


class Chat extends Component {
  constructor() {
    super()
    this.state = {
      host: config.host,
      selfMessages: config.defaultProps.selfMessages,
      messages: config.defaultProps.messages,
      chatHeight: 0,
      inputHeight: 0,
      messagesHeight: 0
    }
  }

  componentDidMount() {
    // setTimeout(() => {
    this.chatHeight = document.getElementsByClassName('App-chat')[0].clientHeight
    const inputHeight = document.getElementsByClassName('chat__form')[0].clientHeight
    const messagesHeight = document.getElementsByClassName('chat__messages')[0]

    console.log(messagesHeight.scrollTop)
    this.setState({
      messagesHeight: this.chatHeight - inputHeight - 10
    })

    // // document.getElementById('chat__messages')[0].offsetHeight = (chatHeight - inputHeight) + 'px'
    // console.log(document.getElementById('chat__messages'))
    // }, 100)
  }

  render() {
    // const styles = StyleSheet.create({
    //   messages: {
    //     height: '200px'
    //   }
    // })

    return (
      <div className='iphone-body'>
        {/* <div className='burst' /> */}
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
          <div className='App-chat'>
            <div className='chat' style={{ height: this.chatHeight }}>
              <Messages
                messages={this.state.messages}
                selfMessages={this.state.selfMessages}
                host={this.state.host}
                messagesHeight={this.state.messagesHeight}
              />
              <Input
                messages={this.state.messages}
                selfMessages={this.state.selfMessages}
                host={this.state.host}
                inputHeight={this.state.inputHeight}
                messagesHeight={this.state.messagesHeight}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat

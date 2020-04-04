
import React, { Component } from 'react'
import './chatbot.css';


import { ReactComponent as Switch } from './switch.svg';
import { ReactComponent as Comment } from './comment.svg';
import { ReactComponent as Bot } from './bot.svg';
import { ReactComponent as User } from './user.svg';
import { ReactComponent as Send } from './upload.svg';


class Chatbot extends Component {

    constructor() {
        super();
        this.state = {
            chatOpen: false,
            chatMessage: '',
            convo: [
                {
                    sender: 'bot',
                    Message: 'Hi How may i help you!',
                    options: [{ title: 'What\'s the time?', value: `Tell me time` }, { title: 'What\'s your name', value: `What\'s your name?` }]
                }
            ]
        }
        this.observer = React.createRef()
        this.setRef = node => {
            if (this.observer.current) this.observer.current.disconnect()
            this.observer.current = new IntersectionObserver(enteries => {
                if (node) this.observer.current.observe(node)
            })

            if (node && this.state.chatOpen) {
                let chatBoxPos = node.parentNode
                console.log(chatBoxPos)
                chatBoxPos.scrollIntoView({ behavior: 'smooth', block: "end", inline: "nearest" })
            }
        }
    }

    userMessage = e => this.setState({ chatMessage: e.target.value })
    pushMessage = e => {
        let botRespone = this.botResponses(this.state.chatMessage)
        this.setState(
            {
                convo: [...this.state.convo,
                { sender: 'user', Message: this.state.chatMessage },
                { sender: 'bot', Message: botRespone.message, options: botRespone.options }],
                chatMessage: ''
            })
    }
    selectAndPush = e => this.setState({ chatMessage: e.target.value }, this.pushMessage)

    botResponses = (value) => {
        switch (value) {
            case 'Tell me time':
                return { message: new Date().toString() }
                break;
            case 'What\'s your name?':
                return { message: `Call me Aladdin!` }
                break;
            default:
                return {
                    message: `My master didn't teach me that! Try these instead :(`,
                    options: [{ title: 'What\'s the time?', value: `Tell me time` }, { title: 'What\'s your name', value: `What\'s your name?` }]
                }
        }
    }


    render() {

        const { convo } = this.state
        console.log(convo)
        return (
            <div className="container-fluid bg-dark vh-100">
                {this.state.chatOpen ? <div className="chat-box">
                    <div className="chat-header d-flex align-items-center">
                        <Bot className="bot-talking-icon-header" />
                        <span className="pl-2">Aladdin!</span>
                    </div>
                    <div className="chat-window">

                        {convo.map((chat, idx) => <> {chat.sender === 'bot' ? <div ref={this.setRef} className="support-bot">
                            <span className="bot-wrapper">
                                <Bot className="bot-talking-icon" />
                            </span>
                            <div className="bot-talk">
                                {chat.Message}
                            </div>
                            <div className="bot-options">
                                <div className="option-wrapper">
                                    {chat.sender === 'bot' ? chat?.options?.map(option => <label className="options">{option.title}
                                        <span >
                                            <input onChange={this.selectAndPush} value={option.value} className="ml-1" type="radio" name="user-will-select" />
                                        </span>
                                    </label>) : null}
                                </div>
                            </div>
                        </div> : null}
                            {chat.sender === 'user' ? <div className="customer pt-2">
                                <span className="customer-wrapper flex-row-reverse">
                                    <User className="bot-talking-icon" />
                                </span>
                                <div className="customer-talk mt-1">
                                    {chat.Message}
                                </div>
                            </div> : null}</>)}

                    </div>
                    <div className="user-input mt-2">
                        <form onSubmit={e => {
                            e.preventDefault()
                            this.pushMessage(e)
                        }}>
                            <input value={this.state.chatMessage} onChange={this.userMessage} placeholder="Shoot your query..." className="form-control" />
                            {this.state.chatMessage ? <Send onClick={this.pushMessage} className="send" /> : null}
                        </form>
                    </div>
                </div> : null
                }
                <div onClick={() => this.setState({ chatOpen: !this.state.chatOpen })} className="chat-pop">
                    {this.state.chatOpen ? <Switch className="switch" fill="white" /> :
                        <Comment className="switch" fill="white" />}
                </div>
            </div>
        )
    }
}

export default Chatbot

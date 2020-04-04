import React, { Component } from 'react'
import Chatbot from '../Components/chatbot'

class Container extends Component {
    render() {
        return (
            <div className="">
                {this.props.children}
                {/* <Chatbot /> */}
            </div>
        )
    }
}

export default Container

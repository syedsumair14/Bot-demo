import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Chatbot from '../Components/chatbot'
import Table from '../Components/table'


class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Chatbot} />
                <Route exact path="/table" component={Table} />
            </Switch>
        )
    }
}

export default Routes

import React, { Component } from 'react'
import { data } from './data'

class Table extends Component {

    state = {
        searchTerm: '',
        foundData: []
    }

    searchfromData = (e) => {
        this.setState({
            searchTerm: e.target.value,
            foundData: data.users.filter(term => term.name.includes(e.target.value))
        })
    }

    componentDidMount() {
        this.setState({ foundData: data.users }, () => console.log(this.state.users, 'SSS'))
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="m-2">
                    <input onChange={this.searchfromData} placeholder="Search Name here..." className="form-control" type="text" />
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.foundData?.map((profile, idx) => <tr>
                            <th>{idx + 1}</th>
                            <td>{profile.name}</td>
                            <td>{profile.email}</td>
                            <td>{profile.phone}</td>
                            <td><button>Edit</button><button>Delete</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table

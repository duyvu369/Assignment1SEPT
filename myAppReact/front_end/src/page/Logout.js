
import React, { Component } from 'react'
import axios from 'axios'
class Logout extends Component {
    constructor(){
        super()
        this.state={
            token:"",
            msg:""
        }
    }
    
componentDidMount(){
    axios.get('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/status')
    .then(response=> {
        this.setState({
            loggedIn:response.data.loggedIn,
            token:response.data.token
        })
        console.log(this.state)
        axios.post('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/logout',{},{
            headers:{
                'Authorization':`${this.state.token}`
            }
        })
    .then(response=> {
        this.setState({
            msg: response.data.message
        })
    })
    .catch(error=> {
        console.log(error)
    })
    })
    .catch(error=> {
        console.log(error)
    })
    }

    
    render() {
        var msg = this.state.msg
        return (
            <div>
                <h3>{msg}</h3>
            </div>
        )
    }
}

export default Logout

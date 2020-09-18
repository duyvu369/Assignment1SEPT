
import React, { Component, Fragment } from 'react'
import axios from 'axios'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Link from 'react-router-dom/Link'

class Navbar extends Component {
    constructor(){
        super()
        this.state=({
          loggedIn:false
        })
      }
      componentDidMount(){    
        axios.get('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/status')
        .then(res => {
        this.setState({
            loggedIn:res.data.loggedIn
        })})
        .catch(error=>{
          console.log(error)
        })
      }
    render() {
        const loggedIn=this.state.loggedIn
        if(loggedIn){
        return (
            <div>
                
            <AppBar>
            <Toolbar position ='sticky'>
                <Fragment>
                <Button color = "inherit" component = {Link} to ="/">Home</Button>
                <Button color = "inherit" component = {Link} to="/doctors">Doctors</Button>
                <Button color = "inherit" component = {Link} to="/account">Personal profile</Button>
                <Button color = "inherit" component = {Link} to="/book">Book</Button>
                <Button color = "inherit" component = {Link} to="/bookings">Appointment</Button>
                <Button color = "inherit" component = {Link} to="/login">Login</Button>
                <Button color = "inherit" component = {Link} to="/register">Register</Button>
                <Button color = "inherit" component = {Link} to="/staffRegister">Register as a hospital staff</Button>
                <Button color = "inherit" component = {Link} to="/feedback">Feedbacks</Button>
                <Button color = "inherit" component = {Link} to="/logout">Log out</Button>
                </Fragment>
            </Toolbar>
            </AppBar>
            </div>
        )
    } else{
        return (
            <div>
            <AppBar>
            <Toolbar position ='sticky'>
                <Fragment>
                <Button color = "inherit" component = {Link} to ="/">Home</Button>
                <Button color = "inherit" component = {Link} to="/doctors">Doctors</Button>
                <Button color = "inherit" component = {Link} to="/login">Login</Button>
                <Button color = "inherit" component = {Link} to="/register">Register</Button>
                <Button color = "inherit" component = {Link} to="/staffRegister">Register as a hospital staff</Button>
                <Button color = "inherit" component = {Link} to="/feedback">Feedbacks</Button>
                </Fragment>
            </Toolbar>
            </AppBar>
            </div>
        )
    }
}
}

export default Navbar
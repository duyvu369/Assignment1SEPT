import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Home from "./Home"
import Register from "./page/Register"
import Login from "./page/Login"
import Navbar from './components/Navbar'
import StaffRegister from './page/StaffRegister'
import Doctors from './page/Doctors'
import Bookings from './page/Bookings'
import Book from './page/Book'
import Profile from "./page/Profile"
import Logout from "./page/Logout"
import axios from 'axios'
import Feedback from "./page/Feedback"
class App extends Component {
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
      <div className="app">
          <Router>
      <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/account" component={Profile} />
          <Route exact path="/staffRegister" component={StaffRegister} />
          <Route exact path="/doctors" component={Doctors} />
          <Route exact path="/book" component={Book} />
          <Route exact path="/bookings" component={Bookings} />
          <Route exact path="/feedback" component={Feedback} />
          <Route exact path="/logout" component={Logout} />
        </Switch>
    </Router>
      </div>
    )
    } else {
      return <div className="app">
      <Router>
    <Navbar />
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/staffRegister" component={StaffRegister} />
      <Route exact path="/doctors" component={Doctors} />
      <Route exact path="/feedback" component={Feedback} />
      </Switch>
  </Router>
  </div>
    }
  }
}

export default App

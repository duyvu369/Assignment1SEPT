import React, { Component } from 'react'
import axios from 'axios'
import '../App.css'
class Login extends Component {
  constructor(props){
    super(props)
    
    this.state  ={
      email:"",
      password:"",
      token:"",
      msg:""
    }
    
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(event){
    const {email, password} = this.state
    axios.post('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/login', {
      email: email,
      password: password,
    })
  
  .then(response => {
      this.setState({
        token:response.data.token,
        msg:response.data.message
      })
      
  })
  .catch(error=>{
    console.log("Login error", error.code)
  })
  event.preventDefault()
}
  
  render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
        <h2 className="active underlineHover">Log in </h2>
      <form onSubmit={this.handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange}
          required
        />
        
        <button type="submit">Login</button>
        <p className="message">{this.state.msg}</p>
      </form>
      </div>
    </div>
    )
  }
}

export default Login

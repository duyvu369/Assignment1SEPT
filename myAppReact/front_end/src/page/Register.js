import React, { Component } from "react";
import axios from "axios";
import '../App.css'

class Register extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      email: "",
      password: "",
      confirmedPW: "",
      name:"",
      phone: "",
      msg: ''
      
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    const { email, password, confirmedPW, phone, name } = this.state
    this.setState({msg:"Please wait!"})
    axios.post('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/register', {
      name: name,
      email: email,
      password: password,
      confirmedPW: confirmedPW,
      phone:phone
    })
      .then((res) => {
          this.setState({
            msg:res.data.message
          }) 
        }
      )
      .catch((error) => {
        console.log(error)
        this.setState({
          msg: "Something went wrong! please try again!"
        })
      })
    event.preventDefault();
  }

  render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
        <h2 className="active underlineHover">Register </h2>
        
        <form onSubmit={this.handleSubmit} >

          <input
            type="email"
            name="email"
            className ="fadeInsecond"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            className ="fadeInthird"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="confirmedPW"
            className ="fadeInfourth"
            placeholder="Password confirmation"
            value={this.state.confirmedPW}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="name"
            className ="fadeInfifth"
            placeholder="Enter your full name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            className ="fadeInsixth"
            placeholder="Enter your phone number"
            value={this.state.phone}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Register</button>
          <p className="message">{this.state.msg}</p>
          </form>
          </div>
        </div>
      
    );
  }
}
export default Register

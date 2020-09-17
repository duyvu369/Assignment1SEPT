import React, { Component } from "react";
import axios from "axios";
import '../App.css'

class StaffRegister extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      email: "",
      password: "",
      confirmedPW: "",
      name:"",
      phone: "",
      companyCode: null,
      position:null,
      msg: ''
      
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { email, password, confirmedPW, phone, name,companyCode,position } = this.state;
    
    axios.post('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/register', {
      name: name,
      email: email,
      password: password,
      confirmedPW: confirmedPW,
      phone:phone,
      companyCode:companyCode,
      position:position
    })
      .then(response => {
        if(response.status===201){
          this.setState({
            msg:"Your account has been created successfully!"
          }) 
        }else{
          
            console.log(response)}
        }
      )
      .catch((error) => {
        console.log(error)
        this.setState({
          msg: "Something went wrong! please try again!"
        })
      });
    event.preventDefault();
  }

  render() {
    return (
      <div class="wrapper fadeInDown">
        <div id="formContent">
        <h2 class="active underlineHover">Register </h2>
        
        <form onSubmit={this.handleSubmit} >

          <input
            type="email"
            name="email"
            class ="fadeInsecond"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
            autocomplete="off" 
          />
          <input
            type="password"
            name="password"
            class ="fadeInthird"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="confirmedPW"
            class ="fadeInfourth"
            placeholder="Password confirmation"
            value={this.state.confirmedPW}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="name"
            class ="fadeInfifth"
            placeholder="Enter your full name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            class ="fadeInsixth"
            placeholder="Enter your phone number"
            value={this.state.phone}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="companyCode"
            class ="fadeInseventh"
            placeholder="Secret code"
            value={this.state.companyCode}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="postion"
            class ="fadeIneighth"
            placeholder="Your position"
            value={this.state.companyCode}
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
export default StaffRegister

import React, { Component } from "react";
import axios from "axios";
import '../App.css'

class Book extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      time: "",
      service: "",
      msg: '',
      date:"",
      loggedIn:false,
      token:""
      
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    axios.get('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/status')
    .then(res => {
        this.setState({
            loggedIn:res.data.loggedIn,
            token:res.data.token
        })
      })
      .catch(error=>{
        console.log(error)
      })}

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { time,date, service} = this.state
    axios.post('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/Booking', {
      time:time,
      date:date,
      service:service
    },{
        headers:{
          'Authorization':`${this.state.token}`
        }
      }
    )
    .then(response => {
      this.setState({
        msg:response.data.message
      })
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        msg: "Something went wrong! please try again!"
      })
    })
    event.preventDefault();
    }

  render() {
    var loggedIn = this.state.loggedIn  
    var token = this.state.token
    if (loggedIn && token==""){
      return <div><h3>Loading..... Please wait</h3></div>
    }
    else{
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
        <h2 className="active underlineHover">Booking form </h2>
        <br></br>
        <h3>Our services:</h3>
        <ul>
        <li>General and specialty surgical services</li>
        <li>X-ray/Radiology services</li>
        <li>Physical therapy and rehabilitation services</li>
        <li>Home nursing services</li>
        <li>Mental health and drug treatment</li>
        <li>Laboratory services</li>
        <li>Blood services</li>
        <li>Short-term hospitalization</li>
        <li>Family planning services</li>
        <li>Nutritional counselling</li>
        </ul>
        <form onSubmit={this.handleSubmit} >

          <input
            type="text"
            name="service"
            className ="fadeInsecond"
            placeholder="What service are you looking for?"
            value={this.state.service}
            onChange={this.handleChange}  
            required
          />
          
          <input
            type="text"
            name="time"
            className ="fadeInthird"
            placeholder="Time (6:30 to 23:00)"
            value={this.state.time}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="date"
            className ="fadeInfourth"
            placeholder="Date (MM/DD/YYYY)"
            value={this.state.date}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Submit</button>
          <p className="message">{this.state.msg}</p>
          </form>
          </div>
        </div>
      
    )}
  }
}
export default Book

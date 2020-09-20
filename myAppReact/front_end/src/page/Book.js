import React, { Component } from "react";
import axios from "axios";
import '../App.css'

class Book extends Component {
  constructor() {
    super()
    //Get input from user, get the token to find the user on the database
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
  //Get log in status
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
  //Submit the booking form to the API
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
      //Get respond message from the backend
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        msg: "Something went wrong! please try again!"
      })
    })
    //Prevent the button to reload the page
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
        <h3>Our services:</h3>(Base fee = 150000VND)
        <table border="1">
         <tr >
            <td><h4>Service name</h4></td>
            
            <td><h4>Service charge<br></br>(Base fee not incluced)</h4></td>
         </tr>
         
         <tr>
            <td>General and specialty surgical services</td>
            <td>1 500 000 VND </td>
         </tr>
         <tr>
            <td>X-ray/Radiology services</td>
            <td>2 800 000 VND </td>
         </tr>
         <tr>
            <td>Physical therapy and rehabilitation services</td>
            <td>650 000 VND </td>
         </tr>
         <tr>
            <td>Home nursing services</td>
            <td>600 000 VND </td>
         </tr>
         <tr>
            <td>Mental health and drug treatment</td>
            <td>800 000 VND </td>
         </tr>
         <tr>
            <td>Laboratory services</td>
            <td>100 000 VND </td>
         </tr>
         <tr>
            <td>Blood services</td>
            <td>400 000 VND </td>
         </tr>
         <tr>
            <td>Short-term hospitalization</td>
            <td>900 000 VND </td>
         </tr>
         <tr>
            <td>Family planning services</td>
            <td>385 000 VND </td>
         </tr>
         <tr>
            <td>Nutritional counselling</td>
            <td>280 000 VND </td>
         </tr>
         </table>
        
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

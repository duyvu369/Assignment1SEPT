import React, { Component } from 'react'
import axios from 'axios'

class Bookings extends Component {
    
    constructor(){
        super()
        this.state = {
            items: [],
            loggedIn:false,
            token:'',
            position:"",
            date:"",
            status:"",
            doctor:"",
            doctorContact:"",
            bId:"",
            bookingStatus:"",
            msg:""
        }
    this.handleFilterByStatus = this.handleFilterByStatus.bind(this)
    this.handleFilterByDate = this.handleFilterByDate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleAssign = this.handleAssign.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    }
    
    componentDidMount(){
    //Get the log in status and the current user
    axios.get('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/status')
    .then(response=> {
        this.setState({
            loggedIn:response.data.loggedIn,
            token:response.data.token
        })
        console.log(this.state)
        //Get the booking history of the user
        axios.get('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/Bookings',{
            headers:{
                'Authorization':`${this.state.token}`
            }
        })
    .then(response=> {
    
        this.setState({
            items: response.data.appointmentList
        })
        console.log(this.state)
        //Get the position of the user
        axios.get('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/account',{
            headers:{
                'Authorization':`${this.state.token}`
            }
        })
    .then(response=> {
        this.setState({
            position:response.data.accountInfo.position
        })
    })
    .catch(error=> {
        console.log(error)
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

    handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    })
    }
    //Filter by date for manager
    handleFilterByDate(event) {
        const { token, date} = this.state
        axios.post('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/Bookings-by-date', {
          date:date
        },{
            headers:{
                "Authorization":`${token}`
            }
        })
          .then((res) => {
              console.log(res.data)
              this.setState({
                items: res.data.bookingsList
              })
              
            }
          )
          .catch((error) => {
            console.log(error)
            this.setState({
              msg: "Something went wrong! please try again!"
            })
          });
        event.preventDefault()
      }
      handleFilterByStatus(event) {
        const { token, status} = this.state
        axios.post('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/Bookings-by-status', {
          status:status
        },{
            headers:{
                "Authorization":`${token}`
            }
        })
          .then((res) => {
              console.log(res.data)
              this.setState({
                items: res.data.bookingsList
              })
              
            }
          )
          .catch((error) => {
            console.log(error)
            this.setState({
              msg: "Something went wrong! please try again!"
            })
          });
        event.preventDefault()
      }
      handleAssign(event){
        const {bId,bookingStatus,doctor,doctorContact} = this.state
        axios.put('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/Booking',{
          doctor:doctor,doctorContact:doctorContact, status:bookingStatus
        },{
          params:{
            bId:bId
          },
          headers:{
            'Authorization':`${this.state.token}`
          }
        }).then(res=>{
          this.setState({
            msg:res.data.message})
        })
        event.preventDefault()
      }
      handleDelete(event){
        console.log(this.state)
        axios.delete('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/Booking',{
          params:{bId:this.state.bId},
          headers:{
            'Authorization':`${this.state.token}`
          }
        }
        ).then(res=>{
          this.setState({
            msg:res.data.message
          })
        })
        .catch(error=>{
          console.log(error)
        })
        event.preventDefault()
      }
    render() {
        
        var {loggedIn, items,position} = this.state  
        //If there is no booking  in booking  history, show a message
        if(loggedIn&&items.length==0){
            return <div><h3>Your booking history is empty!</h3>
            <br></br>
            <h3>You can book an appointment in Book</h3></div>
        }
        else {
            //If the user is a manager, show the filters
            if(position==="Manager"){return <div>
                <h3>Your appointment history:</h3>
                
                    <form onSubmit={this.handleFilterByDate} >

                    Filter by date: 
                    <input
                    type="text"
                    name="date"
                    placeholder="DD/MM/YYYY"
                    value={this.state.date}
                    onChange={this.handleChange}
                    /> <button type="submit">Search</button>
                    </form>
                    <form onSubmit={this.handleFilterByStatus} >

                    Filter by status: 
                    <input
                    type="text"
                    name="status"
                    placeholder="Accepted/Declined/Pending"
                    value={this.state.status}
                    onChange={this.handleChange}
                    /> <button type="submit">Search</button>
                    </form>

                    <ul>
                      <h3>Assign Form</h3>
                    <form onSubmit={this.handleAssign} >

                    Appointment ID:
                    <input
                    type="text"
                    name="bId"
                    onChange={this.handleChange}
                    required
                    /> 
                    <br></br>
                    Status:
                    <input
                    type="text"
                    name="bookingStatus"
                    value={this.state.bookingStatus}
                    onChange={this.handleChange}
                    required
                    /> 
                    <br></br>
                    Doctor: 
                    <input
                    type="text"
                    name="doctor"
                    value={this.state.doctor}
                    onChange={this.handleChange}
                    required
                    /> 
                    <br></br>
                    Doctor contact info:
                    <input
                    type="text"
                    name="doctorContact"
                    value={this.state.doctorContact}
                    onChange={this.handleChange}
                    required
                    /> 
                    <button type="submit">Assign</button>
                    </form>
                    <form onSubmit={this.handleDelete} >
                    Delete a booking:
                    ID: 
                    <input
                    type="text"
                    name="bId"
                    value={this.state.bId}
                    placeholder="Enter the ID of the booking"
                    onChange={this.handleChange}
                    required
                    /> <button type="submit">Delete</button>
                    </form>
                    <h3>{this.state.msg}</h3> 
                    {items.map(item=>(
                    <div className="card" key ={item.bId}>
                      
                    <h3>Service: {item.service}</h3> 
                    <ul>
                    <li>ID: {item.bId}</li>  
                    <li>Time: {item.time} {item.date}</li>
                    <li>Status: {item.status}</li>
                    <li>Doctor: {item.doctor}</li>
                    <li>Base fee: {item.baseFee} VND</li>
                    <li>Doctor contact: {item.doctorContact}</li>

                   
                    </ul>
                    
                    </div>  
                    
                    ))}
                     
                    </ul>
                   
            </div>} else{
                return <div>
                    <h3>Delete a booking:</h3>
                    <form onSubmit={this.handleDelete} >
                    
                    ID: 
                    <input
                    type="text"
                    name="bId"
                    placeholder="Enter the ID of the booking"
                    value={this.state.bId}
                    onChange={this.handleChange}
                    required
                    /> <button type="submit">Delete</button>
                    </form>
                    {items.map(item=>(
                    <div className="card" key ={item.bId}>  
                    <h3>Service: {item.service}</h3> 
                    <ul>
                    <li>ID: {item.bId}</li>
                    <li>Time: {item.time} {item.date}</li>
                    <li>Status: {item.status}</li>
                    <li>Doctor: {item.doctor}</li>
                    <li>Base fee: {item.baseFee} VND </li>
                    <li>Doctor contact: {item.doctorContact}</li>
                    </ul>
                    
                    <h3>{this.state.msg}</h3> 
                </div>
                  ))}
                </div>

            }
            
        }
        
    }
}
export default Bookings

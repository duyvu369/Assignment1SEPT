import React, { Component } from 'react'
import axios from 'axios'
import { Button } from '@material-ui/core'

class Profile extends Component {
    
constructor(){
    super()
    this.state = {
    user: {},
    loggedIn:false,
    token:'',
    email:"",
    name:"",
    phone:"",
    password:"",
    imgLink:"",
    position:"",
    expertise:"",
    background:"",
    msg:""
}
this.handleSubmit = this.handleSubmit.bind(this)
this.handleChange = this.handleChange.bind(this)
this.handleDelete = this.handleDelete.bind(this)
}

    


componentDidMount(){    
    axios.get('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/status')
    .then(res => {
    this.setState({
        loggedIn:res.data.loggedIn,
        token:res.data.token
    })
    axios.get('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/account',
    {
        headers: {
            'Authorization': `${this.state.token}`}
        })
        .then(res=>{
            this.setState({
                user: res.data.accountInfo,
                password:res.data.accountInfo.password,
                expertise:res.data.accountInfo.expertise,
                imgLink:res.data.accountInfo.imgLink,
                background:res.data.accountInfo.background,
                position:res.data.accountInfo.position,
                phone:res.data.accountInfo.phone
            })
    }
    )
    .catch(error=>{
        console.log(error)
    })
    .catch(error=>{
        console.log(error)
    })
    })
    }   
    handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    })}

    handleDelete(event){
        axios.delete('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/account',{
            headers:{
                'Authorization':`${this.state.token}`
            }
        })
        .then(res=> {
            this.setState({
              msg:res.data.message
            }) 
          }
        )
        .catch(error=>{
            console.log(error)
        })
    event.preventDefault()    
    }
    handleSubmit(event) {
        const password = this.state.password
        const phone = this.state.phone
        const expertise = this.state.expertise
        const background = this.state.background
        const imgLink = this.state.imgLink
        const position = this.state.position
        if(position===undefined||position!=="Doctor"){
        axios.put('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/account', {
          password: password
        },{
            headers:{
                'Authorization':`${this.state.token}`
            }
        })
          .then(res=> {
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
          })} else {
            axios.put('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/account', {
                password: password,
                phone:phone,
                expertise:expertise,
                background:background,
                imgLink:imgLink
              },{
                headers:{
                    'Authorization':`${this.state.token}`
                }
            })
                .then(response => {
                  if(response.status===201){
                    this.setState({
                      msg:"Updated successfully!"
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
          })}
        event.preventDefault()
      }
render() {
        
    var loggedIn = this.state.loggedIn
    var position = this.state.position
    var user = this.state.user
    if(!loggedIn){
      return <div><h3>You are required to logged in to use this feature!</h3></div>
    }
    else if(loggedIn &&  Object.keys(user).length==0 ){
        return <div><h3>Loading..... please wait!</h3></div>
    } else if(loggedIn && position ==="Doctor" &&Object.keys(user).length!=0) {
        return <div >
        
                <ul>
            
                    <h3>Personal info:</h3>
                    <br></br>
                    <p>Selfie:</p> <img src={user.imgLink} width="400px" height="400px"></img>
                    <p>Email: {user.email}</p>  
                    <p>Name: {user.name}</p>
                    <p>Phone: {user.phone}</p>
                    <form onSubmit={this.handleSubmit} >
                
                    Password: <input type="text"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            placeholder={user.password}/>
                    <br></br>
                    Img Link:<input type="text"
                            name="imgLink"
                            value={this.state.imgLink}
                            onChange={this.handleChange}
                            placeholder={user.imgLink}/>
                    <br></br>
                    Expertise:<input type="text"
                            name="expertise"
                            value={this.state.expertise}
                            onChange={this.handleChange}
                            placeholder={user.expertise}/>
                    <br></br>
                    Background:<input type="text"
                            name="background"
                            value={this.state.background}
                            onChange={this.handleChange}
                            placeholder={user.background}/>
                    <br></br>
                    <button type="submit">UPDATE</button>
                    <Button onClick={this.handleDelete}>DELETE ACCOUNT</Button>
                    <p className="message">{this.state.msg}</p>
                    </form>


            
                </ul>
            </div>
    }
    else if (loggedIn && position!=="Doctor"){}
        return <div >
            
                <ul>
                
                    <h3>PERSONAL INFO</h3>
                    <p>Email: {user.email} </p>
                    <p>Name: {user.name}</p>
                    <p>Phone: {user.phone}</p>
                    <form onSubmit={this.handleSubmit} > 
                    
                    <br></br>
                    Password: <input type="text"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            placeholder={user.password}
                            />
                    <br></br>
                    <button type="submit">UPDATE</button>
                    <Button onClick={this.handleDelete}>DELETE ACCOUNT</Button>
                    <p className="message">{this.state.msg}</p>
                    </form>
                    
                
                </ul>
        </div>
    }
    }

export default Profile
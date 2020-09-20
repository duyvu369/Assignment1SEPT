import React, { Component } from 'react'
import axios from 'axios'

class Feedback extends Component {
     
    constructor(props){
        super(props)
        this.state = {
            items: [],
            loggedIn:false,
            token:'',
            context:"",
            rating:"",
            fid:"",
            msg:""
        }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit= this.handleSubmit.bind(this)
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
        //Load all the feedbacks
        axios.get('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/Feedbacks',{
            headers:{
                'Authorization':`${this.state.token}`
            }
        })
    .then(response=> {
    
        this.setState({
            items: response.data.feedbacks
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


      handleDelete=e=>{
        axios.delete('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/Feedback',{
          params:{fId:e},
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
      }
    //Filter by date for manager
    handleSubmit() {
        const { token, context, rating} = this.state
        axios.post('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/Feedback', {
          context:context,
          rating:rating
        },{
            headers:{
                "Authorization":`${token}`
            }
        })
          .then((res) => {
              console.log(res.data)
              this.setState({
                msg: res.data.message
              })
              
            }
          )
          .catch((error) => {
            console.log(error)
            this.setState({
              msg: "Something went wrong! please try again!"
            })
          })
      }

    render() {
        
        var {loggedIn, items,msg} = this.state  
            //Only authenticated user can submit feedback
            if(loggedIn){return <div>
                <h3>New feeback</h3>
                    <form onSubmit={this.handleSubmit} >

                    Context
                    <input
                    type="text"
                    name="context"
                    placeholder="Feedback detail!"
                    value={this.state.context}
                    onChange={this.handleChange}
                    required
                    /> 
                    <br></br>
                    Rating:
                    <input
                    type="text"
                    name="rating"
                    placeholder="Please rate our service!"
                    value={this.state.rating}
                    onChange={this.handleChange}
                    required
                    /> 
                    <button type="submit">Submit feedback</button>
                    </form>
                    Feedbacks:
                    {items.map(item=>(
                    <div className="card" key ={item.fId}>
                    <ul>
                    <li>ID: {item.fId}</li> 
                    <li>Context: {item.context}</li> 
                    <li>Rating: {item.rating}</li>  
                    <li> Submitted by: {item.name}</li>
                    <li><button onClick={this.handleDelete.bind(this, item.fId)}>Delete</button></li>         
                    </ul>
                      
                    </div>  
                    ))}
                    <h3>{msg}</h3>  
                    
                    
                     
                    
            </div>} else{
                return <div>
                    
                    <h3>Feedbacks:</h3>
                    {items.map(item=>(
                    <div className="card" key ={item.fId}>
                    <ul>
                    <li>ID: {item.fId}</li> 
                    <li>Context: {item.context}</li> 
                    <li>Rating: {item.rating}</li>  
                    <li> Submitted by: {item.name}</li>         
                    </ul>
                      
                    </div>  
                    ))}
                    <h3>{this.state.msg}</h3>  
                   
            </div>

            }
        
        
        
    }
}

export default Feedback

import React, { Component } from 'react'

class Doctors extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            items: [],
            isLoaded: false
        }
    }
    
    componentDidMount(){
        fetch('https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/Doctors')
        .then(res => res.json())
        .then(json=>{
            this.setState({
                isLoaded: true,
                items: json,
            })
        })
    }
    render() {
        
        var {isLoaded, items} = this.state
        if(!isLoaded){
            return <div>Loading .....</div>
        } else {
            return <div >
                
                <ul>
                    
                    <h1>OUR TEAM</h1>
                    {items.map(item=>(
                      <div className="card" key ={item.dId}>  <h1>Dr {item.name}</h1> 
                      <img src={item.imgLink} width="300px" height="300px"></img>
                      <p>Expertise: {item.expertise}</p>
                      <p>Work email: {item.email}</p>
                      <p>Background: {item.background}</p> </div>  
                    ))}
                    
                </ul>
            </div>
        }
        
    }
}
export default Doctors

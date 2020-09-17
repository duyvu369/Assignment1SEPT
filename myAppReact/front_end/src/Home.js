import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
class Home extends Component {
  render() {
    return (
    <div className="container">
      <div className="center">
        <h1 >Golden Wind</h1>
      </div>
      
      <p className="intro">
        Establish in 1991 by Dr.Khoa Dang, Golden Wind Hospital has almost 3 decades of experiece in the healthcare sector.
       We have come a long way from a small local clinic to becoming the TOP 10 health center of Ho Chi Minh City at one of the best places of District 7. We have all well-trained and highly-experienced doctors, nurses and health specialists.
       We commit to provide our patients with the highest quality healthcare services and all will be treated equally.
       </p>
    </div>
      
    )
  }
}
export default Home

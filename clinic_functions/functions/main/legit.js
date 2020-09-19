const { service } = require("firebase-functions/lib/providers/analytics")

//This file contain all of the validation functions
exports.legitStatus =(statusCode)=>{
  if (status.include(statusCode)){
    return true
  } else { return false}
}
//validate input fields
exports.legitEmail=(email)=>{
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(email.match(regExp)){return true} 
    else {return false}
  }
  
exports.legitName = (name) =>{
    if (name.length>0 && name.length <25){
      return true
    } else {return false}
}
  
exports.legitPassword =(password)=>{
    if (password.length >0 && password.length<15){
      return true
    } else {return false}
}
exports.emptyField = (field)=>{
     if(field === ""){
         return true
     } else {return false}
 } 

exports.checkService =(service)=>{
  if(service!="General and specialty surgical services"&&
  service!="X-ray/Radiology services"&&
  service!="Physical therapy and rehabilitation services"&&
  service!="Home nursing services"&&
  service!="Mental health and drug treatment"&&
  service!="Laboratory services"&&
  service!="Blood services"&&
  service!="Short-term hospitalization"&&
  service!="Family planning services"&&
  service!="Nutritional counselling"){
    return false
  } else {return true}
}

var baseFee =(function() {
  var instance;
  function init() {
    var price = 0;
    return {
      setPrice : function(x) {
        price = x;
      },
      getPrice : function() {
        return price
      }
    }
  }

  return {
    getInstance : function() {
      if (!instance) instance = init();
      return instance;
    }
  }
})()    
var defaultPrice = baseFee.getInstance()
  defaultPrice.setPrice(150000)

exports.priceCalculator=(service)=>{
  serviceCharge = 0
  totalPrice = 0
  var hospitalFee = baseFee.getInstance()
  if(service=="General and specialty surgical services"){
    serviceCharge=1500000
  } else if (service=="X-ray/Radiology services"){
    serviceCharge=2800000
  } else if (service=="Physical therapy and rehabilitation services"){
    serviceCharge=650000
  } else if (service=="Home nursing services"){
    serviceCharge=600000
  } else if (service=="Mental health and drug treatment"){
    serviceCharge=800000
  } else if (service=="Short-term hospitalization"){
    serviceCharge=1000000
  } else if (service=="Blood services"){
    serviceCharge=400000
  } else if (service=="Laboratory services"){
    serviceCharge=900000
  } else if (service=="Family planning services"){
    serviceCharge=385000
  } else if (service=="Nutritional counselling"){
    serviceCharge=280000
  }
  
  
  totalPrice= hospitalFee.getPrice() + serviceCharge
  return totalPrice
}
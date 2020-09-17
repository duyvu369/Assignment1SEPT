const { service } = require("firebase-functions/lib/providers/analytics")

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
   if(service!="General and specialty surgical services"||
   service!="X-ray/Radiology services"||
   service!="Physical therapy and rehabilitation services"||
   service!="Home nursing services"||
   service!="Mental health and drug treatment"||
   service!="Laboratory services"||
   service!="Blood services"||
   service!="Short-term hospitalization"||
   service!="Family planning services"||
   service!="Nutritional counselling"){
     return false
   } else {return true}
 }
 
 exports.checkTime =(time)=>{
  if(time.length>5 ||service.charAt(2)!=":"||service.charAt(0)){
    return false
  }
}
exports.checkDate =(service)=>{
  if(service!=""){}
}
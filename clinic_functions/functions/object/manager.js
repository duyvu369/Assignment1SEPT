const { admin } = require('../main/admin')
const {emptyField,legitEmail, legitStatus } = require('../main/legit')
const status = Object.freeze({"A":"Accepted", "D":"Declined", "P":"Pending"})

exports.assignBooking = (req,res) =>{
  var manager = {}
    admin.firestore().doc(`/accounts/${req.user.phone}`).get().then(doc=>{
       manager = doc.data()
       
       //Reject unauthorized accounts
      if(manager.position===null || manager.position!="Manager"){
        return res.status(401).json({error:"Unauthorized!"})
      }
    })

    //get the status
    let state = status.req.body.status
    const newStatus = {
        "status":state
    }

    if (req.body.doctor!=null ){
      newStatus.doctor = req.body.doctor
    } 
    if (req.body.doctorContact!=null  ){
      newStatus.doctorContact = req.body.doctorContact
    }
  

    //validate that the update info is correct
    const mistakes ={}
    if (newStatus.status!=null){
      if((emptyField(newStatus.status))){
      mistakes.status = 'This field not be empty' }
      if(!legitStatus(newStatus.status)){
      mistakes.status ='Invalid status!'
      }
    } else if (newStatus.doctor!=null){
      if(emptyField(newStatus.doctor)){
      mistakes.doctor = 'This field can not be empty!'
    }} else if (newStatus.doctorContact!=null){
      if(!legitEmail(newStatus.doctorContact)){
        mistakes.doctorContact = 'Invalid email'
      }
    }
      
    if (Object.keys(mistakes).length > 0){
      return res.status(401).json(mistakes)
    }
    admin.firestore().doc(`/Bookings/${req.params.bId}`).update(newStatus).then(()=>{
      res.json({notification: "Assigned succesfully!"})
    })
    .catch(error=>{
      console.error(error)
      return res.status(500).json(error.code)
    })
}
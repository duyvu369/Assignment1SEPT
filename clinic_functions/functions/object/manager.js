const { admin } = require('../main/admin')

exports.assignBooking = (req,res) =>{
    var manager = {}
    admin.firestore().doc(`/accounts/${req.user.phone}`).get().then(doc=>{
       manager = doc.data()
       
       //Reject unauthorized accounts
      if(manager.position!="Manager"){
        return res.json({message:"Unauthorized!"})
      }
    })
    const newStatus={}
    newStatus.status = req.body.status
    newStatus.doctor = req.body.doctor
    newStatus.doctorContact = req.body.doctorContact
  

    //validate that the update info is correct
    if (newStatus.status!="Accepted"&&
    newStatus.status!="Declined"&&
    newStatus.status!="Pending"){
      return res.json({message:"Invalid status!"})}
    
    
      
    admin.firestore().doc(`/Bookings/${req.query.bId}`).update(newStatus).then(()=>{
      res.json({message: "Assigned succesfully!"})
    })
    .catch(error=>{
      console.error(error)
      return res.status(500).json(error.code)
    })
}
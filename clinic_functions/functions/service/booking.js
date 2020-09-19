const { admin } = require('../main/admin.js')
const {emptyField, checkService, priceCalculator } = require('../main/legit')

//create a new online booking form
exports.createBooking = (req, res) =>{
    var user = {}
    admin.firestore().doc(`/accounts/${req.user.phone}`).get().then(doc=>{
    user = doc.data()
    //Fetch the data from user account and discard of unrelated info
    delete user.userId
    delete user.password
    delete user.timeCreated
    delete user.expertise
    delete user.background
    delete user.imgLink
    delete user.position
    user.date = req.body.date
    user.time = req.body.time
    user.service =  req.body.service
    user.status = "Pending"
    //Default booking will have a status of Pending
    user.baseFee =priceCalculator(user.service)
    if(!checkService(user.service)){
      return res.json({message:"Invalid service!"})
    }
    if (user.time.length>5){
      return res.json({message:"Invalid format! 00:00"})
    }
    if (user.date.length>10){
      return res.json({message:"Invalid format! XX/MM/YYYY"})
    }
    //Check if the time and date is available
    admin.firestore().collection('Bookings').get().then(data =>{
    let full = false
    data.forEach(doc =>{
      
      if(user.time === doc.data().time &&
      user.date  === doc.data().date &&
        user.service === doc.data().service){
        full = true
         }

        })
      if (!full){
        return admin.firestore().collection('Bookings').add(user).then((doc)=>{
          const final = user
          final.bId = doc.id
          final.doctor =''
          final.doctorContact =''
          return admin.firestore().doc(`/Bookings/${final.bId}`).update(final).then(()=>{
          res.status(201).json({ message : `A ${user.service} appointment  has been created! `})
          })})
      } else {
        //If the time and date has already been booked, respond with an error message
        return res.json({message:"No doctors are available at that time!"})
      }
      })
   
      }
    )
    //Show the error code in the console and respond with an error msg
    .catch((error)=>{
      console.error(error)
      res.status(500).json({ error: 'Server ever!'})
    })
  }

exports.getBookingDetail=(req,res)=>{
  let bookingDetail ={}
  admin.firestore().doc(`/Bookings/${req.params.bId}`).get().then(doc=>{
    if (doc==null){
      return res.json({message: "404 not found!"})
    }
    bookingDetail =doc.data()
    return res.json({bookingDetail})
  })
  //Show the error code in the console and respond with an error msg
  .catch(error=>{
    console.error(error)
    res.status(500).json({ error: 'Server ever!'})
  })
  }


exports.getBookingHistory =(req,res)=>{
  let user = admin.firestore().doc(`/accounts/${req.user.phone}`)
  user.get().then(doc=>{
  //if the user is not a doctor
  if(doc.data().position===undefined){
    const appointmentList = []
  return admin.firestore().collection('Bookings').where("phone","==",req.user.phone).get().then(doc=>{
      doc.forEach(data=>{
        appointmentList.push({
          bId:data.id,
          ...data.data()
        })
      })
    
    return res.json({appointmentList})
  })
  .catch(error=>{
    console.error(error)
    res.status(500).json({"error":error.code})
  })} 
  //if the doctor log in
  else if(doc.data().position==="Doctor") {
    const appointmentList = []
    //get all the assigned appointments
  return admin.firestore().collection('Bookings').where("doctorContact","==",req.user.email).get().then(doc=>{

      doc.forEach(data=>{
        appointmentList.push({
          bId:doc.id,
          ...data.data()
        })
      })
    //If there is no appointments, it will return a message
    return res.json({appointmentList},{message:"Your assigned Booking:"})
  })
  .catch(error=>{
    console.error(error)
    res.status(500).json({"message":error.code})
  })
  }
  else if(doc.data().position==="Manager"){
    //The manager can see all the Bookings to assign them
    admin.firestore().collection('Bookings').get().then(data =>{
      let appointmentList =[]
      data.forEach(doc =>{
        appointmentList.push({
          bId:doc.id,
          ...doc.data()
        })
      })
      return res.json({appointmentList})
    })
    .catch(error => 
      console.error(error))
  }
})}

//Change Booking detail if necessary
exports.updateAppointmentInfo =(req,res) =>{
  const newAppointmentInfo = {}

  if (req.body.time!=null  ){
    newAppointmentInfo.time = req.body.time
  } 
  if (req.body.service!=null  ){
    newAppointmentInfo.service = req.body.service
  } 
 
  //validate that the update info is correct
  if (newAppointmentInfo.time!=null){
    if((emptyField(newAppointmentInfo.time))){
    return res.json({message:'This field not be empty' })
  }} else if (newAppointmentInfo.service!=null){
    if(emptyField(newAppointmentInfo.service)){
    return res.json({message:'This field can not be empty!'})
    }} 

  admin.firestore().doc(`/Bookings/${req.params.bId}`).update(newAppointmentInfo).then(()=>{
    res.json({notification: "Updated succesfully!"})
  })
  .catch(error=>{
    console.error(error)
    return res.status(500).json(error.code)
  })
}

//Delete a booking
exports.deleteBooking =(req,res)=>{
  admin.firestore().doc(`/Bookings/${req.query.bId}`).get().then(doc=>{
  if(!doc.exists){
    return res.json({message:"404 not found!"})
  } else {
    return admin.firestore().doc(`/Bookings/${req.query.bId}`).delete().then(()=>{
      res.json({message:`Booking deleted successfully!`})
    })
    
    //Show the error code in the console and respond with an error msg
    .catch(error=>{
      console.error(error)
      res.status(500).json({ error: 'Server ever!'})
    })
  }}
  )}

  //Filter bookings by date
exports.bookingFilterByDate =(req,res)=>{
  //Quickly validate the data
  if(req.body.date.length!=10){
    return res.json({message:"Invalid format! DD/MM/YYYY!"})
  }
  const bookingsList = []
  return admin.firestore().collection('Bookings').where("date","==",req.body.date).get().then(doc=>{
      doc.forEach(data=>{
        bookingsList.push({
          bId:doc.id,
          ...data.data()
      })
    })
    return res.json({bookingsList})
  })
  .catch(error=>{
    console.error(error)
    res.status(500).json({"error":error.code})
  })
}


exports.bookingsFilterByStatus =(req,res)=>{
  //get the equivalent status
  if(req.body.status!="Accepted" &&req.body.status!="Declined" &&req.body.status!="Pending"){
    return res.json({message:"Invalid status!"})
  }
  const bookingsList = []
  return admin.firestore().collection('Bookings').where("status","==",req.body.status).get().then(doc=>{
      //get all the booking with the req status
      doc.forEach(data=>{
        bookingsList.push({
          bId:doc.id,
          ...data.data()
        })
      })
    return res.json({bookingsList})
  })
  .catch(error=>{
    console.error(error)
    res.status(500).json({"error":error.code})
  })
}

exports.clearBookingHistory =(req,res)=>{
  var bookingHisotry = admin.firestore().collection('Bookings').where('phone','==',req.user.phone);
  bookingHisotry.get().then(data=> {
    // if there are bookings in booking history, then delete them
    if(data!=null){
  data.forEach(doc=> {
    doc.ref.delete()
  })
  return res.json({message:"Booking history has been cleared!"})}
    // else return error message
  else { return res.json({message:"Booking history is empty!"})}
})
  .catch(error=>{
    console.error(error)
    res.status(500).json({"error":error.code})
  })
}

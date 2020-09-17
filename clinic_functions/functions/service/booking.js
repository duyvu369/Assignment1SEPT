const { admin } = require('../main/admin.js')
const {emptyField, checkService, checkTime, checkDate } = require('../main/legit')

//create a new online booking form
exports.createBooking = (req, res) =>{
    var user = {}
    admin.firestore().doc(`/accounts/${req.user.phone}`).get().then(doc=>{
    user = doc.data()
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
    user.status = status.P
    if(!checkService(user.service)){
      return res.json({message:"Invalid service!"})
    }
    if(!checkTime(user.time)){
      return res.json({message:"Invalid time!"})
    }
    if(!checkDate(user.date)){
      return res.json({message:"Invalid date!"})
    }
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
        return res.json({message:"No doctors are available at that time!"})
      }
      })
   
      }
    )
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
  .catch(error=>{
    console.error(error)
    res.status(500).json(error.code)
  })
  }


exports.getBookingHistory =(req,res)=>{
  let user = admin.firestore().doc(`/accounts/${req.user.phone}`)
  user.get().then(doc=>{
  //if the user is not a doctor
  if(doc.data().position===undefined){
    const appointmentList = []
  return admin.firestore().collection('Bookings').where("phone","==",req.user.phone).get().then(doc=>{
    if(doc ===null){
      //If there are no bookings, show error message
      return res.json({message:"No Bookings found!"})
    } else{
      doc.forEach(data=>{
        appointmentList.push({
          bId:data.id,
          ...data.data()
        })
      })
    }
    if (appointmentList.length===0){
      return res.json({message: "No booking has been scheduled!"})
    }
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
    if(doc ===null){
      return res.json({message:"404 not found!"})
    } else{
      doc.forEach(data=>{
        appointmentList.push({
          bId:doc.id,
          ...data.data()
        })
      })
    }
    //If there is no appointments, it will return a message
    if (appointmentList.length===0){
      return res.json({empty: "No booking has been scheduled!"})
    }
    return res.json({appointmentList})
  })
  .catch(error=>{
    console.error(error)
    res.status(500).json({"error":error.code})
  })
  }
  else if(doc.data().position==="Manager"){
    admin.firestore().collection('Bookings').get().then(data =>{
      let bookings =[]
      data.forEach(doc =>{
        bookings.push({
          bId:doc.id,
          ...doc.data()
        })
      })
      return res.json(bookings)
    })
    .catch(error => console.error(error))
  }
})}


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


exports.deleteBooking =(req,res)=>{
  admin.firestore().doc(`/Bookings/${req.params.bId}`).get().then(doc=>{
  if(!doc.exists){
    return res.json({message:"404 not found!"})
  } else if(doc.data().email!=req.user.email){
    return res.json({message:" You are not allowed to delete this document!"})
  } else {
    return admin.firestore().doc(`/Bookings/${req.params.bId}`).delete().then(()=>{
      res.json({message:`Booking deleted successfully!`})
    })
  .catch(error=>{
    console.error(error)
    return res.status(500).json({error: error.code})
  })
  }}
  )}

exports.bookingFilterByDate =(req,res)=>{
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
    
    if (bookingsList.length===0){
      return res.json({message: "No bookings were scheduled on that day!"})
    }
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
    
    if (bookingsList.length===0){
      //if there is no bookings, show a message
      return res.json({message: "No bookings match your searching!"})
    }
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
    // if there are bookings in booking history, then delete them and send notification
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
    
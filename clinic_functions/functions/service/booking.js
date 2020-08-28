const { admin } = require('../main/admin.js')
const { legitEmail,legitName,emptyField } = require('../main/legit')

//create a new online booking form
exports.createBooking = (req, res) =>{
    var user = {}
    admin.firestore().doc(`/accounts/${req.user.phone}`).get().then(doc=>{
    user = doc.data()
    delete user.userId
    delete user.password
    delete user.timeCreated
    user.time = req.body.time
    user.paymentMethod = req.body.paymentMethod
    user.service =  req.body.service
    user.status = "Pending"
    const mistakes ={}
    if (emptyField(user.service)){
    mistakes.service = 'This field must not be empty'
    } else if (emptyField(user.paymentMethod)){
    mistakes.paymentMethod = 'This field must not be empty'
    } 
    if (Object.keys(mistakes).length > 0){
    return res.status(400).json(mistakes)
    }
    admin.firestore().collection('Bookings').get().then(data =>{
    data.forEach(doc =>{
      if(user.time === doc.data().time &&
        user.service === doc.data().service){
         return res.status(406).json({Rejected:"No doctors are available at that time!"})}
      })
      })
    return admin.firestore().collection('Bookings').add(user).then((doc)=>{
      const final = user
      final.bookingId = doc.id
      res.status(201).json({ notification : `A ${user.service} appointment (id: ${final.bookingId}) has been created! `})
  })
      }
    )
    .catch((error)=>{
      console.error(error)
      res.status(500).json({ error: 'Server ever!'})
    })
  }

//get all the recorded bookings data
exports.getAllBookings = (req, res) => {
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


exports.getBookingDetail=(req,res)=>{
  let bookingDetail ={}
  admin.firestore().doc(`/Bookings/${req.params.bId}`).get().then(doc=>{
    if (doc==null){
      return res.status(404).json({error: "404 not found!"})
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
  const bookingHisotry = []
  return admin.firestore().collection('Bookings').where("phone","==",req.user.phone).get().then(doc=>{
    if(doc ===null){
      return res.status(404).json({error:"404 not found!"})
    } else{
      doc.forEach(data=>{
        bookingHisotry.push({
          bId:doc.id,
          ...data.data()
        })
      })
    }
    if (bookingHisotry.length===0){
      return res.status(404).json({empty: "No booking has been scheduled!"})
    }
    return res.json({bookingHisotry})
  })
  .catch(error=>{
    console.error(error)
    res.status(500).json({"error":error.code})
  })
}

exports.updateAppointmentInfo =(req,res) =>{
  const newAppointmentInfo = {}

  if (req.body.time!=null  ){
    newAppointmentInfo.time = req.body.time
  } 
  if (req.body.service!=null  ){
    newAppointmentInfo.service = req.body.service
  } 
  if (req.body.paymentMethod!=null  ){
    newAppointmentInfo.paymentMethod = req.body.paymentMethod
  }
  //validate that the update info is correct
  const mistakes ={}
  if (newAppointmentInfo.time!=null){
    if((emptyField(newAppointmentInfo.time))){
    mistakes.time = 'This field not be empty' 
  }} else if (newAppointmentInfo.service!=null){
    if(emptyField(newAppointmentInfo.service)){
    mistakes.service = 'This field can not be empty!'
    }} else if (newAppointmentInfo.paymentMethod!=null){
      if(emptyField(newAppointmentInfo.paymentMethod)){
        mistakes.paymentMethod = 'This field can not be empty'
      }
    }
    
  if (Object.keys(mistakes).length > 0){
    return res.status(401).json(mistakes)
  }
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
    return res.status(404).json({error:"404 not found!"})
  } else if(doc.data().email!=req.user.email){
    return res.status(400).json({unauthorized:" You are not allowed to delete this document!"})
  } else {
    return admin.firestore().doc(`/Bookings/${req.params.bId}`).delete().then(()=>{
      res.status(200).json({message:`Booking deleted successfully!`})
    })
  .catch(error=>{
    console.error(error)
    return res.status(500).json({error: error.code})
  })
  }}
  )}
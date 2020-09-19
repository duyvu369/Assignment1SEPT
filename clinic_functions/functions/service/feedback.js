const { admin } = require('../main/admin.js')
const { emptyField } = require('../main/legit')

//create a new online feedback form
exports.createFeedback = (req, res) =>{  
  var feedback = {}
  admin.firestore().doc(`/accounts/${req.user.phone}`).get().then(doc=>{
  feedback = doc.data()
  delete feedback.userId
  delete feedback.password
  delete feedback.timeCreated
  feedback.context = req.body.context
  feedback.rating = req.body.rating

  if (emptyField(feedback.context)){
  return res.json({message:'please provide your experience!'})
  } else if (emptyField(feedback.rating)){
  return res.json({message:'Please rate our service!'})
  } 

  return admin.firestore().collection('feedbacks').add(feedback).then((doc)=>{
    const final = feedback
    final.fId = doc.id
    return admin.firestore().doc(`/feedbacks/${final.fId}`).update(final).then(()=>{
    res.json({ message : `Feedback has been sent!`})
    })})
    }
  )
  .catch((error)=>{
    console.error(error)
    res.status(500).json({ error: 'Server ever!'})
  })
}

//get all the feedbacks from users
exports.getAllFeedbacks = (req, res) => {
    admin.firestore().collection('feedbacks').get().then(data =>{
      let feedbacks =[]
      data.forEach(doc =>{
        feedbacks.push({
          fId:doc.id,
          ...doc.data()
        })
      })
      return res.json({feedbacks})
    })
    //log the error to the console
    .catch(error => console.error(error))
}


exports.getFeedbackDetail=(req,res)=>{
  let feedbackDetail ={}
  admin.firestore().doc(`/feedbacks/${req.query.fId}`).get().then(doc=>{
    //if the feedback does not exist, show error message
    if (doc=== null){
      return res.json({message: "404 not found!"})
    }
    feedbackDetail =doc.data()
    return res.json({feedbackDetail})
  })
  .catch(error=>{
    console.error(error)
    res.status(500).json(error.code)
  })
  }


exports.getFeedbackHistory =(req,res)=>{
  const feedbackHisotry = []
  return admin.firestore().collection('feedbacks').where("phone","==",req.user.phone).get().then(doc=>{
      doc.forEach(data=>{
        feedbackHisotry.push({
          fId:doc.id,
          ...data.data()
        })
      })
    //Show the feedback list
    return res.json({feedbackHisotry})
  })
  .catch(error=>{
    console.error(error)
    res.status(500).json({"error":error.code})
  })
}


exports.deleteFeedback =(req,res)=>{
  admin.firestore().doc(`/feedbacks/${req.query.fId}`).get().then(doc=>{
//check if the feedback exists
  if(!doc.exists){
    return res.json({message:"404 not found!"})
  }  else {
    //delete the feedback
    return admin.firestore().doc(`/feedbacks/${req.query.fId}`).delete().then(()=>{
      res.json({message:`Feedback deleted successfully!`})
    })
  .catch(error=>{
    console.error(error)
    return res.status(500).json({error: error.code})
  })
  }}
  )}

exports.clearFeedbackHistory =(req,res)=>{
    var feedbackHisotry = admin.firestore().collection('feedbacks').where('phone','==',req.user.phone);
    feedbackHisotry.get().then(data=> {
      // if there are feedbacks in feedback history, then delete them and send notification
      if(data!=null){
    data.forEach(doc=> {
      doc.ref.delete()
    })
     res.json({message:"Feedback history has been cleared!"})}
      // else return error message
    else { return res.json({message:"Feedback history is empty!"})}
  })
    .catch(error=>{
      console.error(error)
      res.status(500).json({"error":error.code})
    })
  }
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
  const mistakes ={}
  if (emptyField(feedback.context)){
  mistakes.context = 'please provide your experience!'
  } else if (emptyField(feedback.rating)){
  mistakes.rating = 'This field must not be empty'
  } 
  if (Object.keys(mistakes).length > 0){
  return res.status(400).json(mistakes)
  }
  return admin.firestore().collection('feedbacks').add(feedback).then((doc)=>{
    const final = feedback
    final.fId = doc.id
    final.bId = req.params.bId
    return admin.firestore().doc(`/feedbacks/${final.fId}`).update(final).then(()=>{
    res.status(201).json({ notification : `A feedback for booking ${req.params.bId} has been sent!`})
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
      return res.json(feedbacks)
    })
    //log the error to the console
    .catch(error => console.error(error))
}


exports.getFeedbackDetail=(req,res)=>{
  let feedbackDetail ={}
  admin.firestore().doc(`/feedbacks/${req.params.fId}`).get().then(doc=>{
    //if the feedback does not exist, show error message
    if (doc=== null){
      return res.status(404).json({error: "404 not found!"})
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
    if(doc ===null){
    //if the feedback does not exist, show error message
      return res.status(404).json({error:"404 not found!"})
    } else{
      doc.forEach(data=>{
        feedbackHisotry.push({
          fId:doc.id,
          ...data.data()
        })
      })
    }
    //If there is no feedback created by a user, show message
    if (feedbackHisotry.length===0){
      return res.status(404).json({empty: "No feedback has been created!"})
    }
    //Show the feedback list
    return res.json({feedbackHisotry})
  })
  .catch(error=>{
    console.error(error)
    res.status(500).json({"error":error.code})
  })
}


exports.deleteFeedback =(req,res)=>{
  admin.firestore().doc(`/feedbacks/${req.params.fId}`).get().then(doc=>{
//check if the feedback exists
  if(!doc.exists){
    return res.status(404).json({error:"404 not found!"})
  } else if(doc.data().email!=req.user.email){
    return res.status(400).json({unauthorized:" You are not allowed to delete this document!"})
  } else {
    //delete the feedback
    return admin.firestore().doc(`/feedbacks/${req.params.fId}`).delete().then(()=>{
      res.status(200).json({message:`Feedback deleted successfully!`})
    })
  .catch(error=>{
    console.error(error)
    return res.status(500).json({error: error.code})
  })
  }}
  )}

exports.clearFeedbackHistory =(req,res)=>{
    var feedbackHisotry = admin.firestore().collection('feedbacks').where('phone','==',req.user.phone);
    feedbackHisotry.get().then(querySnapshot=> {
      // if there are feedbacks in feedback history, then delete them and send notification
      if(querySnapshot!=null){
    querySnapshot.forEach(doc=> {
      doc.ref.delete()
    })
     res.status(400).json({message:"Feedback history has been cleared!"})}
      // else return error message
    else { return res.status(404).json({message:"Feedback history is empty!"})}
  })
    .catch(error=>{
      console.error(error)
      res.status(500).json({"error":error.code})
    })
  }
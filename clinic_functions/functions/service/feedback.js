const { admin } = require('../main/admin.js')
const { emptyField } = require('../main/legit')

//create a new online feedback form
exports.createFeedback = (req, res) =>{
    var newFeedback = {}
    admin.firestore().doc(`/accounts/${req.user.phone}`).get().then(doc=>{
    newFeedback = doc.data()
    delete newFeedback.userId
    delete newFeedback.password
    delete newFeedback.timeCreated
    newFeedback.feedbackContext = req.body.feedbackContext
    newFeedback.rating = req.body.rating
    const mistakes ={}
    //If user submit an empty feedback, it will be rejected
    if (emptyField(newFeedback.feedbackContext)){
    mistakes.service = 'This field must not be empty'
    } 
    //if there are error in input by user, show the errors
    if (Object.keys(mistakes).length > 0){
    return res.status(400).json(mistakes)
    }
    //generate a new feedback by the current user
    return admin.firestore().collection('feedbacks').add().then((doc)=>{
      const final = user
      final.bookingId = doc.id
      res.status(201).json({ notification : `A ${user.service} feedback (id: ${final.bookingId}) has been submited! `})
  })
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
      return res.status(404).json({empty: "No feedback has been scheduled!"})
    }
    //Show the feedback list
    return res.json({feedbackHisotry})
  })
  .catch(error=>{
    console.error(error)
    res.status(500).json({"error":error.code})
  })
}

exports.updateFeedbackInfo =(req,res) =>{
  const newFeedbackInfo = {}

  if (req.body.feedbackContext!=null  ){
    newFeedbackInfo.feedbackContext = req.body.feedbackContext
  } 
  if (req.body.rating!=null  ){
    newFeedbackInfo.rating = req.body.rating
  } 
 
  //validate that the update info is correct
  const mistakes ={}
  if (newFeedbackInfo.feedbackContext!=null){
    if((emptyField(newFeedbackInfo.feedbackContext))){
    mistakes.feedbackContext = 'This field not be empty' 
  }} else if (newFeedbackInfo.rating!=null){
    if(emptyField(newFeedbackInfo.rating)){
    mistakes.rating = 'This field can not be empty!'}}

  //Show the input erros  
  if (Object.keys(mistakes).length > 0){
    return res.status(401).json(mistakes)
  }
  //Update the feedback
  admin.firestore().doc(`/feedbacks/${req.params.fId}`).update(newFeedbackInfo).then(()=>{
    res.json({notification: "Updated succesfully!"})
  })
  .catch(error=>{
    console.error(error)
    return res.status(500).json(error.code)
  })
}


exports.deleteFeedback =(req,res)=>{
  admin.firestore().doc(`/Feedbacks/${req.params.bId}`).get().then(doc=>{
//check if the feedback exists
  if(!doc.exists){
    return res.status(404).json({error:"404 not found!"})
  } else if(doc.data().email!=req.user.email){
    return res.status(400).json({unauthorized:" You are not allowed to delete this document!"})
  } else {
    //delete the feedback
    return admin.firestore().doc(`/Feedbacks/${req.params.fId}`).delete().then(()=>{
      res.status(200).json({message:`Feedback deleted successfully!`})
    })
  .catch(error=>{
    console.error(error)
    return res.status(500).json({error: error.code})
  })
  }}
  )}
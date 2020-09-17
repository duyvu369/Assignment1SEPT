const { admin } = require('./admin')
const {clearBookingHistory} = require('../service/booking')
const {clearFeedbackHistory} = require('../service/feedback')
//Firebase configuration
const config = {
  apiKey: "AIzaSyBDD68Bo2aPMnn79mnFsguYCmbou6jUDVA",
  authDomain: "online-clinic-booking-system.firebaseapp.com",
  databaseURL: "https://online-clinic-booking-system.firebaseio.com",
  projectId: "online-clinic-booking-system",
  storageBucket: "online-clinic-booking-system.appspot.com",
  messagingSenderId: "819997834038",
  appId: "1:819997834038:web:fd22ddb666d7639ac51197",
  measurementId: "G-9112XH00EP"
}
const firebase = require('firebase')
firebase.initializeApp(config)

const { legitEmail,legitName,legitPassword,emptyField} = require('./legit')

//sign up function
exports.accountRegister = (req, res) =>{
    const newAccount ={
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      confirmedPW: req.body.confirmedPW
    }
    //validate input
    if (legitName(newAccount.name)===false){
      return res.json({message:'Name can not be empty nor exceed 25 characters!'})
    } else if (legitPassword(newAccount.password)===false){
      return res.json({message:'Password can not be empyty nor exceed 14 characters!'})
    } else if (legitEmail(newAccount.email)===false){
      return res.json({message:'Invalid email address!'}) 
    } else if (newAccount.password != newAccount.confirmedPW){
      return res.json({message:'Confirmed password does not match'})
    } else if (emptyField(newAccount.phone)){
        return res.json({message:'invalid phone number'})
    }

    //phone must be unique
    let userId
    admin.firestore().doc(`/accounts/${newAccount.phone}`).get().then(doc=>{
      if (doc.exists){
        res.json( {message:`${doc.data().phone} has already been used.`})
      }
      else {
        return firebase.auth().createUserWithEmailAndPassword(newAccount.email, newAccount.password).
        then(data=>{
          userId = data.user.uid
          return data.user.getIdToken()
        }).then(() =>{

          const accountInfo ={
            name: newAccount.name,
            email: newAccount.email,
            phone: newAccount.phone,
            password: newAccount.password,
            timeCreated: new Date().toISOString(),
            userId
          }
          return admin.firestore().doc(`/accounts/${newAccount.phone}`).set(accountInfo).then(()=>{
            return firebase.auth().signInWithEmailAndPassword(accountInfo.email, accountInfo.password).then(doc =>{
              let user = firebase.auth().currentUser
              user.sendEmailVerification()
              return res.json({message:` A verification link has been sent to your email!`})})
            })
        })
      }
    })
    //catching reusing email error
    .catch((errors)=>{
      console.error(errors)
      if (errors.code === "auth/email-already-in-use"){
        return res.status(400).json({email:`${newAccount.email} has already been used!`})
     } else {
       return res.status(500).json({errors: errors.code})}
    })
}

//sign in function
exports.login = (req,res)=>{
    const account ={
      email: req.body.email,
      password: req.body.password
    }


    if (legitPassword(account.password)===false){
      return res.json({message:'Password can not be empyty nor exceed 14 characters!'})
    } else if (legitEmail(account.email)===false){
      return res.json({message:'Invalid email address!'})
    }

    firebase.auth().signInWithEmailAndPassword(account.email, account.password).then(doc =>{
      
      return doc.user.getIdToken()
    }).then(tokenCode =>{
      const loggedIn ={
        loggedIn:true,
        token:tokenCode
      }
    admin.firestore().doc(`/Status/loggedInStatus`).update(loggedIn).then(()=>{
      return res.json({message:"Login succesfully!",
    token:loggedIn.token})
    }
    )
    })
    .catch(errors =>{
      console.error(errors)
      if (errors.code === "auth/wrong-password"){
        return res.status(400).json({error: `Password and email doesn not match!`})
      } else {return res.status(501).json(errors.code)}
    })
}

//show user personal info
exports.getAccountInfo = (req,res )=>{
      accountInfo ={}
      admin.firestore().doc(`/accounts/${req.user.phone}`).get().then(doc=>{
        if(doc!=null){
          accountInfo = doc.data()
          delete accountInfo.userId
          delete accountInfo.timeCreated
          delete accountInfo.confirmedPW
        } else{
          return res.json({message:"404 not found"})}
        return res.json({accountInfo})
    })
    .catch(error=>{
      console.error(error)
      res.status(500).json({errors : error.code})
    })
}

//update account personal info (can not change phone,name or email)
exports.updateAccountInfo =(req,res) =>{
    const newAccountInfo = {}
    //Update only the fields that users want to update
    if (req.body.password!=null  ){
      newAccountInfo.password = req.body.password
    } 
    if (req.body.imgLink!=null  ){
      newAccountInfo.imgLink = req.body.imgLink
    }
    if(req.body.background!=null){
      newAccountInfo.background = req.body.background
    }
    if(req.body.expertise!=null){
      newAccountInfo.expertise = req.body.expertise
    }
    
      
    //validate that the update info is correct
    if (newAccountInfo.password!=null){
      if((legitPassword(newAccountInfo.password)===false||emptyField(newAccountInfo.password))){
      return res.json({message:'Password can not be empyty nor exceed 14 characters!' })
    }}  else if (newAccountInfo.imgLink!=null){
        if(emptyField(newAccountInfo.imgLink)){
          return res.json({message:'Image link can not be empty'})
        }
      } else if(newAccountInfo.background!=null){
        if(emptyField(newAccountInfo.background)){
          return res.json({message:"This field can not be empty"})
        }}
        else if(newAccountInfo.expertise!=null){
          if(emptyField(newAccountInfo.expertise)){
            return res.json({message:"This field can not be empty"})
          }
      }

    //If there are no return res.json({message:}), update the account
    admin.firestore().doc(`/accounts/${req.user.phone}`).update(newAccountInfo).then(()=>{
      res.json({notification: "Updated succesfully!"})
    })
    .catch(error=>{
      console.error(error)
      return res.status(500).json(error.code)
    })
}

//Show all existing accounts
exports.getAllAccounts = (req, res)=>{
    admin.firestore().collection('accounts').orderBy('name','asc').get().then(data=>{
      let accounts =[]
      data.forEach(doc =>{
        accounts.push({
          ...doc.data()})
        })
        return res.json(accounts)
      })
      .catch(error => console.error(error))
}

//Delete an account and all the related data such as bookings,feedbacks
exports.deleteAccount=(req,res)=>{
  //first delete feedbacks and bookings associated with the account
  var feedbackHisotry = admin.firestore().collection('feedbacks').where('phone','==',req.user.phone)
  feedbackHisotry.get().then(data=> {
    if(data!=null){
  data.forEach(doc=> {
    doc.ref.delete()
  })}})
  var bookingHisotry = admin.firestore().collection('Bookings').where('phone','==',req.user.phone)
  bookingHisotry.get().then(data=> {
    if(data!=null){
  data.forEach(doc=> {
    doc.ref.delete()
  })}})
  admin.firestore().doc(`/Status/loggedInStatus`).update({
    loggedIn:false,
    token:""
  })
  admin.firestore().doc(`/accounts/${req.user.phone}`).get().then(doc=>{
    if(doc!=null){
  admin.firestore().doc(`/accounts/${req.user.phone}`).delete().then(()=>{
      let user = firebase.auth().currentUser
      return user.delete().then(()=>{
        res.json({message: "Account deleted successfully!"})
      })
    })
  }
  else{
    return res.status(400).json({error:`Account does not exist!`})}})
    .catch((errors)=>{
    console.error(errors)
      return res.status(500).json({errors: errors.code})
    })
  }
     

//register as a doctor
exports.staffRegister = (req, res) =>{
  const newStaff ={
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    confirmedPW: req.body.confirmedPW,
    companyCode: req.body.companyCode,
    service: req.body.service,
    background: req.body.background,
    position: req.body.position,
    imgLink:""
  }
  //validate input

  if (legitName(newStaff.name)===false){
    return res.json({message:'Name can not be empty nor exceed 25 characters!'})
  } else if (legitPassword(newStaff.password)===false){
    return res.json({message:'Password can not be empyty nor exceed 14 characters!'})
  } else if (legitEmail(newStaff.email)===false){
    return res.json({message:'Invalid email address!'})
  } else if (newStaff.password != newStaff.confirmedPW){
    return res.json({message:'Confirmed password does not match'})
  } else if (emptyField(newStaff.phone)){
      return res.json({message:'invalid phone number'})
  } else if (newStaff.companyCode!="goldenwind"){
    return res.json({message:'invalid code!' })
  } else if (newStaff.position!="Doctor" ||newStaff.position!="Manager"){
    return res.json({message:'Invalid! Can only be Doctor or Manager'})
  }

  //phone must be unique
  let userId
  admin.firestore().doc(`/accounts/${newStaff.phone}`).get().then(doc=>{
    if (doc.exists){
      res.json( {phone:`${doc.data().phone} has already been used.`})
    }
    else {
      return firebase.auth().createUserWithEmailAndPassword(newStaff.email, newStaff.password).
      then(data=>{
        userId = data.user.uid
        return data.user.getIdToken()
      }).then(() =>{
        const accountInfo ={
          position: newStaff.position,
          name: newStaff.name,
          email: newStaff.email,
          phone: newStaff.phone,
          password: newStaff.password,
          timeCreated: new Date().toISOString(),
          userId
        }
        return admin.firestore().doc(`/accounts/${newDoctor.phone}`).set(accountInfo).then(()=>{
          let user = firebase.auth().currentUser
          user.sendEmailVerification()
          return res.json({message:` A verification link has been sent to your email!`})})
      })
    }
  })

  //catching reusing email error
  .catch((errors)=>{
    console.error(errors)
    if (errors.code === "auth/email-already-in-use"){
      return res.status(400).json({email:`${newDoctor.email} has already been used!`})
   } else {
     return res.status(500).json({errors: errors.code})}
  })
}


exports.logOut= (req,res)=>{
  firebase.auth().signOut().then(()=>{
    const notLoggedIn ={
      loggedIn:false,
      token:''
    }
    admin.firestore().doc(`/Status/loggedInStatus`).update(notLoggedIn).then(()=>{
      return res.json({message:"Logged Out!"})
    }
  )
  })
  .catch(error=>{
    console.log(error)
  })
}
exports.getLoggedInStatus= (req,res)=>{
  admin.firestore().collection('Status').get().then(data =>{
    let state = {}
    data.forEach(doc =>{
      state = doc.data()
      })
    return res.json(state)
    })
  
  .catch(error => console.error(error))
}


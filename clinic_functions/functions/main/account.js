const { admin } = require('./admin')
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


//show all the registered accounts

//sign up function
exports.accountRegister = (req, res) =>{
    const mistakes ={}
    const newAccount ={
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      confirmedPW: req.body.confirmedPW
    }
    //validate input
    if (legitName(newAccount.name)===false){
      mistakes.name = 'Name can not be empty nor exceed 25 characters!'
    } else if (legitPassword(newAccount.password)===false){
      mistakes.password = 'Password can not be empyty nor exceed 14 characters!'
    } else if (legitEmail(newAccount.email)===false){
      mistakes.email = 'Invalid email address!'
    } else if (newAccount.password != newAccount.confirmedPW){
      mistakes.password = 'Confirmed password does not match'
    } else if (emptyField(newAccount.phone)){
        mistakes.phone = 'invalid phone number'
    }
    
    if (Object.keys(mistakes).length > 0){
      return res.status(401).json(mistakes)
    }
    //phone must be unique
    var accountToken
    let userId
    admin.firestore().doc(`/accounts/${newAccount.phone}`).get().then(doc=>{
      if (doc.exists){
        res.status(402).json( {phone:`${doc.data().phone} has already been used.`})
      }
      else {
        return firebase.auth().createUserWithEmailAndPassword(newAccount.email, newAccount.password).
        then(data=>{
          userId = data.user.uid
          return data.user.getIdToken()
        }).then(tokenCode =>{
          accountToken = tokenCode
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
              return res.status(201).json({message:` A verification link has been sent to your email!, ${accountToken}`})})
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

    const mistakes ={}
  
    if (legitPassword(account.password)===false){
      mistakes.password = 'Password can not be empyty nor exceed 14 characters!'
    } else if (legitEmail(account.email)===false){
      mistakes.email = 'Invalid email address!'
    }
    
    if (Object.keys(mistakes).length >0){
      return res.status(401).json(mistakes)
    }
    firebase.auth().signInWithEmailAndPassword(account.email, account.password).then(doc =>{
      
      return doc.user.getIdToken()
    }).then(tokenCode =>{
      return res.json({message:`${tokenCode}`})
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
          return res.status(404).json({error:"404 not found"})}
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

    if (req.body.password!=null  ){
      newAccountInfo.password = req.body.password
    } 
    if (req.body.gender!=null  ){
      newAccountInfo.gender = req.body.gender
    } 
    if (req.body.age!=null  ){
      newAccountInfo.age = req.body.age
    }
    if(req.user.position!=null && req.user.position==="Doctor"){
      if(req.body.background!=null){
        newAccountInfo.background = req.body.background
      }
      if(req.body.expertise!=null){
        newAccountInfo.expertise = req.body.expertise
      }}

    //validate that the update info is correct
    const mistakes ={}
    if (newAccountInfo.password!=null){
      if((legitPassword(newAccountInfo.password)===false||emptyField(newAccountInfo.password))){
      mistakes.password = 'Password can not be empyty nor exceed 14 characters!' 
    }} else if (newAccountInfo.age!=null){
      if(newAccountInfo.age<13||emptyField(newAccountInfo.age)){
      mistakes.age = 'You are not old enough to sign up!'
      }} else if (newAccountInfo.gender!=null){
        if(emptyField(newAccountInfo.gender)){
          mistakes.gender = 'Gender can not be empty'
        }
      } else if(newAccountInfo.background!=null){
        if(emptyField(newAccountInfo.background)){
          mistakes.background ="This field can not be empty"
        }}
        else if(newAccountInfo.expertise!=null){
          if(emptyField(newAccountInfo.expertise)){
            mistakes.expertise ="This field can not be empty"
          }
      }
      
    if (Object.keys(mistakes).length > 0){
      return res.status(401).json(mistakes)
    }
    if (!req.user.position!=null){
    admin.firestore().doc(`/accounts/${req.user.phone}`).update(newAccountInfo).then(()=>{
      res.json({notification: "Updated succesfully!"})
    })
    .catch(error=>{
      console.error(error)
      return res.status(500).json(error.code)
    })} else if (req.user.position==="Doctor"){
      admin.firestore().doc(`/Doctors/${req.user.phone}`).update(newAccountInfo).then(()=>{
      res.json({notification: "Updated succesfully!"})
    })
    .catch(error=>{
      console.error(error)
      return res.status(500).json(error.code)}
    )}
    else if (req.user.position==="Manager"){
      admin.firestore().doc(`/managers/${req.user.phone}`).update(newAccountInfo).then(()=>{
      res.json({notification: "Updated succesfully!"})
    })
    .catch(error=>{
      console.error(error)
      return res.status(500).json(error.code)}
  )}
    }


  exports.getAllAccounts = (req, res)=>{
    admin.firestore().collection('accounts').orderBy('name','asc').get().then(data=>{
      let account =[]
      data.forEach(doc =>{
        account.push({
          ...doc.data()})
        })
        return res.json(account)
      })
      .catch(error => console.error(error))
}

exports.deleteAccount=(req,res)=>{
  admin.firestore().doc(`/accounts/${req.user.phone}`).get().then(doc=>{
    if (doc.data().email=req.user.email){
      return admin.firestore().doc(`/accounts/${req.user.phone}`).delete().then(()=>
      res.status(200).json({message: "Account deleted successfully"}))
    }
  })
}

exports.doctorRegister = (req, res) =>{
  const newDoctor ={
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    confirmedPW: req.body.confirmedPW,
    companyCode: req.body.companyCode,
    service: req.body.service,
    background: req.body.background
  }
  //validate input
  const mistakes ={}
  if (legitName(newDoctor.name)===false){
    mistakes.name = 'Name can not be empty nor exceed 25 characters!'
  } else if (legitPassword(newDoctor.password)===false){
    mistakes.password = 'Password can not be empyty nor exceed 14 characters!'
  } else if (legitEmail(newDoctor.email)===false){
    mistakes.email = 'Invalid email address!'
  } else if (newDoctor.password != newDoctor.confirmedPW){
    mistakes.password = 'Confirmed password does not match'
  } else if (emptyField(newDoctor.phone)){
      mistakes.phone = 'invalid phone number'
  } else if (newDoctor.companyCode!="goldenwind"){
    mistakes.phone = 'invalid code!' 
}
  
  if (Object.keys(mistakes).length > 0){
    return res.status(401).json(mistakes)
  }
  //phone must be unique
  var accountToken
  let userId
  admin.firestore().doc(`/accounts/${newDoctor.phone}`).get().then(doc=>{
    if (doc.exists){
      res.status(402).json( {phone:`${doc.data().phone} has already been used.`})
    }
    else {
      return firebase.auth().createUserWithEmailAndPassword(newDoctor.email, newDoctor.password).
      then(data=>{
        userId = data.user.uid
        return data.user.getIdToken()
      }).then(tokenCode =>{
        accountToken = tokenCode
        const accountInfo ={
          position:"Doctor",
          name: newDoctor.name,
          email: newDoctor.email,
          phone: newDoctor.phone,
          password: newDoctor.password,
          timeCreated: new Date().toISOString(),
          userId
        }
        return admin.firestore().doc(`/accounts/${newDoctor.phone}`).set(accountInfo).then(()=>{
          let user = firebase.auth().currentUser
          user.sendEmailVerification()
          return res.status(201).json({message:` A verification link has been sent to your email!, ${accountToken}`})})
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

exports.managerRegister = (req, res) =>{
  
  const newAccount ={
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    confirmedPW: req.body.confirmedPW,
    companyCode: req.body.companyCode
  }
  //validate input
  if (legitName(newAccount.name)===false){
    mistakes.name = 'Name can not be empty nor exceed 25 characters!'
  } else if (legitPassword(newAccount.password)===false){
    mistakes.password = 'Password can not be empyty nor exceed 14 characters!'
  } else if (legitEmail(newAccount.email)===false){
    mistakes.email = 'Invalid email address!'
  } else if (newAccount.password != newAccount.confirmedPW){
    mistakes.password = 'Confirmed password does not match'
  } else if (emptyField(newAccount.phone)){
      mistakes.phone = 'invalid phone number' 
  } else if (newAccount.companyCode!="goldenwind"){
      mistakes.phone = 'invalid code' 
  }
  const mistakes ={}
  if (Object.keys(mistakes).length > 0){
    return res.status(401).json(mistakes)
  }
  //phone must be unique
  var accountToken
  let userId
  admin.firestore().doc(`/accounts/${newAccount.phone}`).get().then(doc=>{
    //If the  phone has been already used,
    if (doc.exists){
      res.status(402).json( {phone:`${doc.data().phone} has already been used.`})
    }
    else {
      return firebase.auth().createUserWithEmailAndPassword(newAccount.email, newAccount.password).
      then(data=>{
        
        userId = data.user.uid
        return data.user.getIdToken()
      }).then(tokenCode =>{
        accountToken = tokenCode
        const accountInfo ={
          position: "Manager",
          name: newAccount.name,
          email: newAccount.email,
          phone: newAccount.phone,
          password: newAccount.password,
          timeCreated: new Date().toISOString(),
          userId
        }
        return admin.firestore().doc(`/accounts/${newAccount.phone}`).set(accountInfo).then(()=>{
          let user = firebase.auth().currentUser
          user.sendEmailVerification()
          return res.status(201).json({message:` A verification link has been sent to your email!, ${accountToken}`})
            })
          })
  }})
  //If user reused an email, send an error message
  .catch((errors)=>{
    console.error(errors)
    if (errors.code === "auth/email-already-in-use"){
      return res.status(400).json({email:`${newAccount.email} has already been used!`})
   } else {
     return res.status(500).json({errors: errors.code})}
  })
}
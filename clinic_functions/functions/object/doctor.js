const { admin } = require('../main/admin')


//show all the doctors in the hospital
exports.getAllDoctors =(req, res) => {
    admin.firestore().collection('accounts').where("position","==","Doctor").get().then(data =>{
      let doctors =[]
      data.forEach(doc =>{
        doctors.push({
          dId:doc.id,
          ...doc.data()})
      })
      return res.json(doctors)
    })
    .catch(error => console.error(error))
}



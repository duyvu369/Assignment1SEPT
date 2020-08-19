const { admin }= require('../main/admin')


exports.filterByName = (req,res) =>{
    const n = {
        name:req.body.name}
   
    const name = admin.firestore().collection('accounts').where('name','==',n.name).get().then(doc=>{
        if(!doc.exists){
            return res.status(404).json({notfound:"There is not any account with such name!"})
        }
        return res.json(name)
    })
}
//Thanh Vinh
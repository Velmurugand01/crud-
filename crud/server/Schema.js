const mongoose=require('mongoose')
const Validation =new mongoose.Schema({
    Name:String,
    Age:String,
    City:String,
   
})

module.exports=mongoose.model('Validation',Validation)
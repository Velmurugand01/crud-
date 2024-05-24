const express = require('express')
const app = express()
const mongoose=require('mongoose')
var cors = require('cors')
require('dotenv').config()
const Schema=require('./Schema')

mongoose.connect(process.env.DB_URL)    
.then(()=>{
    console.log(("database connected sucessfully"));

})
.catch(()=>{
    console.log(("database not  connected"));
})



app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(express.json());


app.post ('/Post',async(req,res)=>{
  
    const data=new Schema({
    ...req.body
  })
  
    try{
    if(data){
        await data.save()
        res.json(data)
      }
      else{
          res.json("Data is Required")
         
      }
   }
   catch(error){
    console.log(error)
   }
   
})


//  Get particular data use this method 
  
// app.get('/Get/:id',async(req,res)=>{
//   try{
//     const details=await Schema.findById(req.params.id)
//     res.json(details)
      
//   }
//   catch(error){
//     console.log(error)
//   }
   
// })

app.get('/Get',async(req,res)=>{
  try{
    const details=await Schema.find({})
    res.json(details)
      
  }
  catch(error){
    console.log(error)
  }
   
})

app.put('/Put/:id',async(req,res)=>{
   
    try{
         const ubdate=  await Schema.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
       
         console.log("ubdate",ubdate)
  
       if(ubdate){
        res.json(ubdate)
        console.log(ubdate);
       }
    
    }
    catch(error){
        res.json(error)
    }

})
app.delete('/Delete/:id',async(req,res)=>{
   try{
    const deleted= await Schema.findByIdAndDelete(req.params.id)
    if(deleted){
        res.json("Deleted Successfully")
    }
   }
   catch(error){
    console.log(error)
   }
})


app.listen(process.env.port,()=>{
    console.log(`Server Is Running ${process.env.port}`);
})


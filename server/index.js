const express = require('express')
const app = express() 
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(cors()) //we use cors as middleware. middleware modifies the response & passes it to next function
app.use(express.json()) //we use express.json() as middleware to let express know that body should be parsed as json.

mongoose.connect('mongodb://127.0.0.1:27017/fullstack') //mongodb automatically creates 'fullstack' database with this line.

// mongoose.connection.on("error", err => {
//     console.log("err", err)
//   })
// mongoose.connection.on("connected", (err, res) => {
//     console.log("mongoose is connected")
// })

app.post('/api/register',async (req,res)=>{
    console.log(req.body)
    try{
        const newPassword = await bcrypt.hash(req.body.password, 10)
        const user = await User.create({
            name:req.body.name,
            email: req.body.email,
            password: newPassword
        })
        res.json({status: 'ok'})
    }catch(err){
        // console.log("register=>",err);
        res.json({status: 'error', error:'Duplicate email'})
    }
})

//login route
app.post('/api/login',async (req,res)=>{
    const user = await User.findOne({
        email: req.body.email, 
    })
    if(!user){
        return res.json({status: 'error', user:"Invalid email"})
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
    
    if(isPasswordValid){
        const token = jwt.sign(
        {
            name: user.name,
            email: user.email
        }, 'secret123')
        return res.json({status: 'ok', user:token})
        // return res.json({status: 'ok', user:true})
    }
    else{
        return res.json({status: 'error', user:false})
    }
})
//get existing quote
app.get('/api/quote',async (req,res)=>{
   const token = req.headers['x-access-token']
   try{
    const decoded = jwt.verify(token,'secret123')
    const email = decoded.email
    const user = await User.findOne({email:email})
    return res.json({status: 'ok', quote:user.quote})
    }catch(error){
    console.log(error)
    res.json({status: 'error', error: 'invalid token'})
   }
})

//upload or update quote
app.post('/api/quote',async (req,res)=>{
    const token = req.headers['x-access-token']
    try{
     const decoded = jwt.verify(token,'secret123')
     const email = decoded.email
     await User.updateOne(
        {email:email}, 
        {$set:{quote:req.body.quote}}
        )
     return res.json({status: 'ok'})
     }catch(error){
     console.log(error)
     res.json({status: 'error', error: 'invalid token'})
    }
 })
app.listen(1337, ()=>{
    console.log("server started")
})
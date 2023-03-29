//MERN app
//order : 
//1. setup server (node) + client (react).
//2. setup express soutes and exchange data between frontend and backend
//development => node.js server + react server (we need cors in dev server)
//production => node.js server + static react files

//express is just easier node.js syntax

const express = require('express')
const app = express() 
const cors = require('cors')
//we use cors as middleware. middleware modifies the response & passes it to next function
app.use(cors())
//we use express.json() as middleware to let express know that body should be parsed as json.
app.use(express.json())
app.post('/api/register',(req,res)=>{
    console.log(req.body)
    res.json({status: 'ok'})
})
app.listen(1337, ()=>{
    console.log("server started")
})
require("dotenv").config();
const express = require('express');
const route = express.Router();
const exitadmin = require("../middlewares/admin_middle");
const jwt = require("jsonwebtoken");
const jwtpassword = process.env.JWT_SECREAT;
const{ admins} = require("../db/mndb")

route.post('/signup',async(req,res)=>{
    console.log("456");
    
    try{
    const {name,id , password }= req.body;
    const isadmin =await admins.findOne({id:id});
    if(isadmin != null){
        res.send("admin lready exist , go to login")
    }
   const newadmin =await new admins({name:name,id:id,password:password});
   newadmin.save();
   res.status(200).send("admin succesfully signed up ");
    }catch(error){
    res.status(404).send("internal error");
    }
}) 

route.post('/login',exitadmin,(req,res)=>{
    
    
    const {id , password }= req.body;
    const token = jwt.sign({id:id},jwtpassword);
    console.log(token);
    res.status(200).header({'Authorization':`bearer ${token}`}).json({
        "token":`bearer ${token}`,
        "message": "you sucessfully logged in"
    }) 
    
})
module.exports = route;
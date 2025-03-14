const express = require('express');
const { users } = require('../db/mndb');
function userMiddleware(req,res,next){

}
//user verification for signup
async function exituserS(req,res,next){
    try{
     const id = req.body.id;
     const ans =await users.findOne({ id:id});
     if(ans == null){
       return  next();
     }
     res.status(400).send("user  already exits please signup");
    }
    catch(error){
   console.log("server error");
   
    }
}
//user verification for login
async function exituserL(req,res,next){
 try{
    console.log("exituserLLL");
    
 const { id ,password} = req.body;
   const ans = await users.findOne({ id:id ,password:password});
   if(ans == null){
    res.status(404).send('invailed user credentials ');
   }
   return next();
 }catch(error){
    console.log(error);
    
   res.status(404).send("server error");
 }
}
module.exports = { userMiddleware , exituserS, exituserL};
const express = require('express');
const { users } = require('../db/mndb');
const jwt = require('jsonwebtoken');
const jwtverifypass = process.env.JWT_SECREAT;
console.log(jwtverifypass);

function userMiddleware(req,res,next){
try {
  const {token } = req.headers;
console.log(token);
const vfytoken = token.split(" ")[1];
jwt.verify(vfytoken,jwtverifypass,(err,decode)=>{  
  if(err){
  return  res.status(404).send("error at token verification")
  }
  next();
})
} catch (error) {
  console.log(error);
  res.status(505).send("error at adminacess through token");
}

}
//user verification for signup
async function exituserS(req,res,next){
    try{
     const id = req.body.id;
     const ans =await users.findOne({ id:id});
     if(ans == null){
       return  next();
     }
     res.status(400).send("user  already exits please Login");
    }
    catch(error){
   
   res.status(404).send("server error");
    }
}
//user verification for login
async function exituserL(req,res,next){
 try{
    
 const { id ,password} = req.body;
   const ans = await users.findOne({ id:id ,password:password});
   if(ans == null){
    res.status(404).send('invailed user credentials try again');
   }
   return next();
 }catch(error){
    console.log(error);
    
   res.status(404).send("server error");
 }
}

module.exports = { userMiddleware , exituserS, exituserL};
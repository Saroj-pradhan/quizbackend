
const express = require("express");
const { admins }= require("../db/mndb");


async function exitadmin(req,res,next){
    console.log("11");
    
    try{
    const {id , password }= req.body;
  const ans = await admins.findOne({id:id,password:password});

  
  if(ans == null){
    res.status(404).send("invalied credentials ");
  }else{
 return  next();
  }
}catch(error){
    console.log(error);
    
    res.status(505).send("internal server error");
}
}
module.exports =  exitadmin;
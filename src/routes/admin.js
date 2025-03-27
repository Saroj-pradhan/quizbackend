require("dotenv").config();
const express = require('express');
const route = express.Router();
const { exitadmin , verifytoken} = require("../middlewares/admin_middle");
const jwt = require("jsonwebtoken");
const jwtpassword = process.env.JWT_SECREAT;
const{ admins , mcaquiz} = require("../db/mndb")

route.post('/signup',async(req,res)=>{
    console.log("456");
    
    try{
    const {name,id , password }= req.body;
    const isadmin =await admins.findOne({id:id});
    if(isadmin != null){
      return  res.send("admin lready exist , go to login")
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
    
});
route.post('/insert',verifytoken,async (req,res)=>{
  try {
    const {question , answer , option }= req.body;
    console.log(question,answer,option);
   const newquiz =await new mcaquiz({
    
    question:question,
    answer:answer,
    option:option

   })
   newquiz.save(); 
    res.send("working fine");
  } catch (error) {
    console.log(error);
    res.send("error at insert admin");
    
  }
})
route.get("/getquiz",verifytoken,async (req,res)=>{
try {
  const value =await mcaquiz.find();
  console.log(value); 
  console.log(Array.isArray(value));
  res.json({
    "message":value
  });
} catch (error) {
console.log(error);
res.send("error at getquiz")

}
});
route.put('/update',verifytoken,async (req,res)=>{
  try {
    const { _id,data } = req.body;
  console.log(_id ,data);
  const updatequiz = await mcaquiz.findByIdAndUpdate(_id,data,{ new: true });
  updatequiz.save();
  res.status(200).json({
    "message":"all ok ",
    "updated value":updatequiz
  })
  } catch (error) {
    console.log(error);
    res.send("error at updating");
  }
  
})
route.delete('/delete',verifytoken,async(req,res)=>{
try {
  const {_id,data} = req.body;
  console.log(_id);
  await mcaquiz.deleteOne({_id:_id});
  
  res.send("all ok for delete");
} catch (error) {
  console.log(error);
  res.status(404).send("error occur at deletion");
}
})
module.exports = route;
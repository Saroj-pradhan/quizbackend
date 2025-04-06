const express = require('express');
const router = express.Router();
require("dotenv").config({ path:'../env'});  
const { users,admins,mcaquiz } = require('../db/mndb');
const { userMiddleware , exituserS,exituserL} = require('../middlewares/user_middle');
const jwt = require('jsonwebtoken');
const jwtpassword = process.env.JWT_SECREAT;
console.log(jwtpassword);
const bcrypt = require('bcrypt');
const saltround = 10;
//signup rotes                              
router.post('/signup',exituserS,async (req,res)=>{
try{
    const name = req.body.name;
const id = req.body.id;

const password = req.body.password;
const hasspassword = await bcrypt.hash(password,saltround);
console.log("Original Password:", password);
        console.log("Hashed Password:", hasspassword);
const newuser =await new users({
    name:name,
    id:id,
    password:hasspassword
})
await newuser.save();
res.json({ 
    "message": " signed up successgully! go to login",
  
});
}
catch(error){
   res.status(505).send("server error");
     
};
});
// Login routes
router.post('/login',exituserL,(req,res)=>{
 try{
 
    
  const {id , password} = req.body;
  const token = jwt.sign({id:id},jwtpassword,{expiresIn:'1h'});

  res.status(200).header("authorization",`bearer ${token}`).json({ "message": "you are successfully logged in", "token":token});
 }catch(error){
    res.status(404).send("internal server login error");
 }
});
router.get('/getquiz',userMiddleware,async (req,res)=>{
   try {
    const ans = await mcaquiz.find();
    res.json({
        "message":ans
    })
   } catch (error) {
    console.log(error);
    res.status(404).send("error at fetchoing quizes")
     
   }
})
module.exports = router;
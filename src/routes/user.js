const express = require('express');
const router = express.Router();
require("dotenv").config({ path:'../env'});  
const { users,admins,mcaquiz } = require('../db/mndb');
const { userMiddleware , exituserS,exituserL} = require('../middlewares/user_middle');
const jwt = require('jsonwebtoken');
const jwtpassword = process.env.JWT_SECREAT;
console.log(jwtpassword);
//signup rotes                              
router.post('/signup',exituserS,async (req,res)=>{
try{
    const name = req.body.name;
const id = req.body.id;
const password = req.body.password;

const newuser =await new users({
    name:name,
    id:id,
    password:password
})
newuser.save();
res.send(`succesfully signedup and the id is ${id} `);
}
catch(error){
    console.log(error);
    console.log("any error");
     
};
});
// Login routes
router.post('/login',exituserL,(req,res)=>{
 try{
    console.log("677");
    
  const {id , password} = req.body;
  const token = jwt.sign({id:id},jwtpassword);
  console.log(id,jwtpassword);
  console.log(token);
  
  
  res.header("authorization",`bearer ${token}`).send(`you are logged in and your token is : ${token} `);
 }catch(error){
    res.status(404).send("internal server login error");
 }
});
module.exports = router;
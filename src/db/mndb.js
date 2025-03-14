require("dotenv").config();
const mongoose = require('mongoose');
// mongodb database connect
const dbconnect = async()=>{
await mongoose.connect("mongodb+srv://saroj:saroj@saroj.nty39.mongodb.net/USER-AUTH?retryWrites=true&w=majority").then(()=>{
   
    
    console.log('✅  sucessful connected with mongoodb');
    
})

.catch((err)=>{
   
    console.log("error in connecting with mongoodb");
    
});
}
// schema for user 
const userSchema = new mongoose.Schema({
    name :String,
    id :String,
    password :String
});
const adminSchema = new mongoose.Schema({
    name :String,
    id :String,
    password :String
});
const quizSchema = new mongoose.Schema({
    quizType: { 
        type: String, 
        default: "ojee-mca-quiz", // Fixed value for all questions
        //immutable: true // Prevents modification after creation
      },
    qustion:{type:String,required:true},
    option:[{type:String} ],
    answer:{type:String,required:true}
});
const users = mongoose.model('users',userSchema);  
const admins = mongoose.model('admins',adminSchema);
const mcaquiz= mongoose.model('mcaquiz',quizSchema);
module.exports = { dbconnect , users, admins, mcaquiz} ; 

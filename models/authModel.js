const mongoose = require('mongoose');

const commonSignupSchema = new mongoose.Schema({
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    role:{
        type : String,
        required : true,
        default:'user'
    }
})

const collection = new mongoose.model("signup",commonSignupSchema)

module.exports=collection;
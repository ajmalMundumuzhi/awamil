const mongoose = require('mongoose');

const commonSignupSchema = new mongoose.Schema({
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    }
})

const collection = new mongoose.model("signup",commonSignupSchema)

module.exports=collection;
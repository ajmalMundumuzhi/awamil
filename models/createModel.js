const mongoose=require('mongoose');

const createSchema = new mongoose.Schema({
    word:{
        type : String,
        required : true
    },
    sentence:{
        type : String,
        required : true
    },
    grammer:{
        type : String,
        required : true
    },
    image:{
        type : String,
        // required : true
    }
})

const collection=new mongoose.model("newPublishes",createSchema)

module.exports=collection
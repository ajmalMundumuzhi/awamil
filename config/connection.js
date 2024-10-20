const mongoose=require('mongoose');

async function dbConnect(){
    await mongoose.connect(process.env.MONGOURL,{
        dbName:'irab'
    })
    .then(()=>{
        console.log('MongoDB connected successfully')
    })
    .catch((err)=>{
        console.log('MongoDB connection failed',err)
    })
}

module.exports=dbConnect;
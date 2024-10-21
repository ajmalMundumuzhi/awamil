const express=require('express');
const app=express();
require('dotenv').config();
const dbConnect = require("./config/connection")
const port=process.env.PORT

//for common route
const common=require("./routes/commonRouter")
app.use("/auth",common)


dbConnect()
    .then(()=>{
    app.listen(port,()=>{
        console.log(`Server running on ${port}`);
    })
    })
    .catch((err)=>{
        console.log(`Database connection failed : `,err);
})
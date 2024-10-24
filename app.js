const express=require('express');
const app=express();
require('dotenv').config();
const dbConnect = require("./config/connection")
const port=process.env.PORT

// loading Assets 
app.use(express.static('./public'))

//for common route
const common=require("./routes/commonRouter")
app.use("/auth",common)

// for user route
const user=require("./routes/userRouter")
app.use("/",user)

// for admin route
const admin=require("./routes/adminRouter")
app.use("/admin",admin)


// MongoDB connecting
dbConnect()
    .then(()=>{
    app.listen(port,()=>{
        console.log(`Server running on ${port}`);
    })
    })
    .catch((err)=>{
        console.log(`Database connection failed : `,err);
})
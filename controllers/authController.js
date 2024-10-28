const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken')
const signupModel = require('../models/authModel')
const signupValidation = require("../utilities/signupValidation")

const JWT_SECRET = process.env.JWT_SECRET

// signup setup
exports.signupGet=(req,res)=>{
    res.render("signup")
}


exports.signupPost=async (req,res)=>{
    try{    
        const {mail,password}=req.body;
        const alreadyEmail=await signupModel.findOne({ email : mail })
        if(alreadyEmail){ 
            return res.status(422).json({message:'The email is already takes'})
        }
        if(!signupValidation.validationFields([mail,password])){
            return res.status(422).json({message:'Please provide all details'})
        }
        else if(!signupValidation.emailValidation(mail)){
            return res.status(422).json({message : 'Enter a valid email'})
        }
        else if(!signupValidation.passwordValidation(password)){
            return res.status(422).json({message : 'Give a strong password'})
        }else{
            const hashedpass =await bcrypt.hash(password,10);
            const newUser=new signupModel({
                email : mail,
                password : hashedpass
            })
            await newUser.save()
            res.redirect('/auth/login')
        }
    }
    catch(err){
        console.log("Signup failed",err)
        res.redirect('/auth/signup')
    }
}

// login setup 
exports.loginGet=(req,res)=>{
    res.render('login')
}

exports.loginPost=async (req,res)=>{
    try{
        const userMail = req.body.mail
        const userProfile= await signupModel.findOne({email:userMail})

        if(userProfile){

        const password=await bcrypt.compare(req.body.password,userProfile.password)

        if(password){
            const token = jwt.sign(
                {userId : userProfile._id, role : userProfile.role},
                process.env.JWT_SECRET,
                {expiresIn : '1h'}
            )
            if(userProfile.role === 'admin'){
                res.status(200).json({
                    user : 'admin',
                    data : 'Admin logged in succesfully',
                    token : token 
                })
            }else{
                res.status(200).json({
                    user : 'user',
                    data : 'User logged in succesfully',
                    token : token
                })
            }
        }
        else{
            console.log("Your password is incorrect")
            res.status(401).json({user : 'admin', data : 'Check your password'})
        }
    }
        else{
            console.log('User details is wrong, check again')
            res.status(400).json({user : 'admin', data : 'Check your Details'})

    }
}
catch(err){
    console.log(`error when login to user`,err)
}
} 
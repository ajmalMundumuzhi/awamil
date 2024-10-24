const bcrypt=require('bcrypt');
const signupModel = require('../models/authModel')
const signupValidation = require("../utilities/signupValidation")
// redirect to home page 

// signup setup
exports.signupGet=(req,res)=>{
    res.render("signup")
}


exports.signupPost=async (req,res)=>{
    try{    
        const {mail,password}=req.body;
        const alreadyEmail=await signupModel.findOne({ email : mail })
        if(alreadyEmail){ 
            res.status(422).json({message:'The email is already takes'})
        }
        if(!signupValidation.validationFields([mail,password])){
            res.status(422).json({message:'Please provide all details'})
        }
        else if(!signupValidation.emailValidation(mail)){
            res.status(422).json({message : 'Enter a valid email'})
        }
        else if(!signupValidation.passwordValidation(password)){
            res.status(422).json({message : 'Give a strong password'})
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
                if(userProfile.role === 'admin'){
                    res.redirect('/admin')
                }else{
                    res.redirect('/')
                }
            }
            else{
                console.log("Your password is incorrect")
                res.redirect('/auth/login')
            }
    }
        else{
            console.log('User details is wrong, check again')
            res.redirect('/auth/login')
    }
}
catch(err){
    console.log(`error when login to user`,err)
}
}
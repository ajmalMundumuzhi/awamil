const express=require('express');
const commonRouter=express()
const authController=require('../controllers/authController');

commonRouter.use(express.json())
commonRouter.use(express.urlencoded({ extended: true }))

commonRouter.set('view engine','ejs')
commonRouter.set('views','./views/common')


// redirect to signup page 
commonRouter.get('/signup',authController.signupGet)
commonRouter.post('/signup',authController.signupPost)

// redirect to login page 
commonRouter.get('/login',authController.loginGet)
commonRouter.post('/login',authController.loginPost)

module.exports=commonRouter
const express=require('express');
const userRouter=express();
const userController=require('../controllers/userController')

userRouter.use(express.json())
userRouter.use(express.urlencoded({ extended: true }));
userRouter.set('view engine','ejs')
userRouter.set('views','./views/user')

userRouter.get('/',userController.home)

module.exports=userRouter
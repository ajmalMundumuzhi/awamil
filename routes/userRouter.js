const express=require('express')
const userRouter=express();
const multer = require('multer');
const storage = require('../utilities/multer');
const userController=require('../controllers/userController');

const upload=multer({storage : storage})

userRouter.use(express.json())
userRouter.use(express.urlencoded({ extended: true }));
userRouter.set('view engine','ejs')
userRouter.set('views','./views/user')

userRouter.get('/',userController.home)

// Get into detail page
userRouter.get('/detailPage/:id',userController.detailPage)

module.exports=userRouter
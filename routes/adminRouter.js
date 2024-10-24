const multer = require('multer')
const express=require('express')
const adminRouter=express()
const adminController=require('../controllers/adminController')
const storage = require('../utilities/multer')

const upload=multer({storage : storage})

adminRouter.use(express.json());
adminRouter.use(express.urlencoded({ extended: true }));
adminRouter.set('view engine','ejs')
adminRouter.set('views','./views/admin')

// Dashboard
adminRouter.get('/',adminController.dashboardAdmin)

// adding page
adminRouter.get('/create',adminController.createAdminGet)
adminRouter.post('/create',upload.single('cardImage'),adminController.createAdminPost);
adminRouter.get('/uploads',adminController.uploadsadminGet)

// view page
adminRouter.get('/viewCardDetails/:id',adminController.cardDetailGet)

// edit page
adminRouter.get('/editCard/:id',adminController.cardUpdateGet)
adminRouter.post('/editCard/:id',upload.single('cardImage'),adminController.cardUpdatePost)

// delete card
adminRouter.post('/deleteCard/:id',adminController.cardDeletePost)
module.exports=adminRouter  
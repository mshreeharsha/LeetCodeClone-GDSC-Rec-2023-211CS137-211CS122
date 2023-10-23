const express=require('express')
const router=express.Router()

const {registerController,loginController,addToListController}=require('../controllers/UserController.js')
const {requireSignIn}=require('../middleware/requireAuth')

router.post('/register',registerController)
router.post('/login',loginController)
router.patch('/addToList/:uid',requireSignIn,addToListController)

module.exports=router
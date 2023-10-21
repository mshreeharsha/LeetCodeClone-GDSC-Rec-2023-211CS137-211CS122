const express=require('express')
const router=express.Router()
const {requireSignIn,isAdmin}=require('../middleware/requireAuth')
const {addBoilerPlateCodeController}=require('../controllers/BoilerPlateCodeController')

router.post('/add-code',requireSignIn,isAdmin,addBoilerPlateCodeController)

module.exports=router
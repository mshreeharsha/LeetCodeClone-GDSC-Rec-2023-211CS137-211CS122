const express=require('express')
const router=express.Router()
const {requireSignIn,isAdmin}=require('../middleware/requireAuth')
const {addBoilerPlateCodeController,getBoilerPlateSingleProblem}=require('../controllers/BoilerPlateCodeController')

router.post('/add-code',requireSignIn,isAdmin,addBoilerPlateCodeController)
router.get('/get-singleProblemCode/:pid',getBoilerPlateSingleProblem)

module.exports=router
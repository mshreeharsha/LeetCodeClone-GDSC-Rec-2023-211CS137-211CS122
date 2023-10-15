const express=require('express')
const router=express.Router()

const {createProblemController}=require('../controllers/ProblemController')
const {requireSignIn,isAdmin}=require('../middleware/requireAuth')

router.post('/create-problem',requireSignIn,isAdmin,createProblemController)

module.exports=router
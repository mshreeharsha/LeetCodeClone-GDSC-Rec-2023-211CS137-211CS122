const express=require('express')
const router=express.Router()

const {createProblemController,getAllProblemsController}=require('../controllers/ProblemController')
const {requireSignIn,isAdmin}=require('../middleware/requireAuth')

router.post('/create-problem',requireSignIn,isAdmin,createProblemController)
router.get('/all-problems',getAllProblemsController)

module.exports=router
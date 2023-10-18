const express=require('express')
const router=express.Router()

const {createProblemController,getAllProblemsController,getSingleProblemController}=require('../controllers/ProblemController')
const {requireSignIn,isAdmin}=require('../middleware/requireAuth')

router.post('/create-problem',requireSignIn,isAdmin,createProblemController)
router.get('/all-problems',getAllProblemsController)
router.get('/single-problem/:slug',getSingleProblemController)

module.exports=router
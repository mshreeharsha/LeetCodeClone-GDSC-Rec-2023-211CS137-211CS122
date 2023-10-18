const express=require('express')
const router=express.Router()

const {createProblemController,getAllProblemsController,getSingleProblemController,getNextProblemController,getTotalNoOfProblems}=require('../controllers/ProblemController')
const {requireSignIn,isAdmin}=require('../middleware/requireAuth')

router.post('/create-problem',requireSignIn,isAdmin,createProblemController)
router.get('/all-problems',getAllProblemsController)
router.get('/single-problem/:slug',getSingleProblemController)
router.get('/next-problem/:problemNo',getNextProblemController)
router.get('/total-problems',getTotalNoOfProblems)

module.exports=router
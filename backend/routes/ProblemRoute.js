const express=require('express')
const router=express.Router()

const {createProblemController,getAllProblemsController,getSingleProblemController,getNextProblemController,getTotalNoOfProblems,getProblemsFilter,searchProblemController}=require('../controllers/ProblemController')
const {requireSignIn,isAdmin}=require('../middleware/requireAuth')

router.post('/create-problem',requireSignIn,isAdmin,createProblemController)
router.get('/all-problems',getAllProblemsController)
router.get('/single-problem/:slug',getSingleProblemController)
router.get('/next-problem/:problemNo',getNextProblemController)
router.get('/total-problems',getTotalNoOfProblems)
router.post('/problem-filter',getProblemsFilter)
//search based on user entered value
router.get('/search/:keyword',searchProblemController);

module.exports=router
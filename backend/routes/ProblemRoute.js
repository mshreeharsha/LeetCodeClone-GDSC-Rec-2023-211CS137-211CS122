const express=require('express')
const router=express.Router()

const {createProblemController}=require('../controllers/ProblemController')

router.post('/create-problem',createProblemController)

module.exports=router
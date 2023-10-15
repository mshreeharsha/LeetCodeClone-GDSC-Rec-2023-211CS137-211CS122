const express=require('express')
const router=express.Router()

const {createProblemController}=require('../controllers/ProblemController.js')

router.post('/create-problem',createProblemController)

module.exports=router
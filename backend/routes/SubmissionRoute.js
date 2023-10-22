const express=require('express')
const router=express.Router()

const {createSubmissionController,allSubmissionsController}=require('../controllers/SubmissionController')

router.post('/create-submission',createSubmissionController)
router.get('/all-submissions/:slug/:email',allSubmissionsController)

module.exports=router
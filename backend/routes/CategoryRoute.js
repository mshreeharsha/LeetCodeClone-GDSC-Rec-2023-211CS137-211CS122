const express=require('express')
const router=express.Router()
const {requireSignIn,isAdmin}=require('../middleware/requireAuth')
const {createCategoryController}=require('../controllers/CategoryController')

router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

module.exports=router
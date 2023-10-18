const express=require('express')
const router=express.Router()
const {requireSignIn,isAdmin}=require('../middleware/requireAuth')
const {createCategoryController,getAllCategoryController}=require('../controllers/CategoryController')

router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

router.get('/all-categories',getAllCategoryController)

module.exports=router
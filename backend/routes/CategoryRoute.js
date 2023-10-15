const express=require('express')
const router=express.Router()

const {createCategoryController}=require('../controllers/CategoryController.js')

router.post('/create-category',createCategoryController)

module.exports=router
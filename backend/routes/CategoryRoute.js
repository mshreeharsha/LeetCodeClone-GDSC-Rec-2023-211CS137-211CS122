const express=require('express')
const router=express.Router()

const {createCategoryController}=require('../controllers/CategoryController')

router.post('/create-category',createCategoryController)

module.exports=router
const categoryModel = require('../models/CategoryModel')
const slugify = require('slugify')

const createCategoryController = async(req,res)=>{
    try {
        const {name}=req.body;
        if(!name){
            return res.status(401).send({
                message:'Category Name is Required'
            })
        }
        const existingCategory=await categoryModel.findOne({name});

        if(existingCategory){
            return res.status(200).send({
                message:'Category Already Exists'
            })
        }

        const category= await categoryModel.create({name,slug:slugify(name)});
        res.status(201).send({
            success:true,
            message:'New Category Created',
            category
            
        });

    } catch (error) {
        res.status(500).send({
            success:false,
            error,
            message:'Error in Category'
        });
    }
}

const getAllCategoryController=async(req,res)=>{
    try{
       const categories=await categoryModel.find({})
       res.send({
        success:true,
        message:'All categories successfully fetched',
        categories
       })
    }catch(error){
       res.send({
        success:false,
        error,
        message:'Error in get all categories'
       })
    }
}

module.exports = {createCategoryController,getAllCategoryController}
const mongoose=require('mongoose')
const {Schema,model}=mongoose
const CategorySchema=Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    slug:{
        type:String,
        lowercase:true
    }
})

const categoryModel=model('Category',CategorySchema) //Model name is Category and the structure is defined by CategorySchema
module.exports=categoryModel; //Category model is exported to be accessible outside the file
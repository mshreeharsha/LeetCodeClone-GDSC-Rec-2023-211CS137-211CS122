const mongoose=require('mongoose') 
const {Schema,Model}=mongoose
const UserSchema=Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    solvedProblems:[{
        type:mongoose.ObjectId,
        ref:'Problem'      //store id of solved problems of the user
    }],
},{timestamps:true}) // timestamps give the time when the user object was created

const model=Model('User',UserSchema) //Model name is User and the schema for the model is UserSchema
module.exports=model; //exporting the model to be available outside this file
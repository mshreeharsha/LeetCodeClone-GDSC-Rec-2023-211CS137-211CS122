const mongoose=require('mongoose')
const {Schema,model}=mongoose
const ProblemSchema=Schema({
    
})

const problemModel=model('Problem',ProblemSchema) //Model name is Problem and the structure is defined by ProblemSchema
module.exports=problemModel; //Problem model is exported to be accessible outside the file
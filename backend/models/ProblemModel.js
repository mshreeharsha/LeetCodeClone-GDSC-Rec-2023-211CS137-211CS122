const mongoose=require('mongoose')
const {Schema,Model}=mongoose
const ProblemSchema=Schema({
    
})

const model=Model('Problem',ProblemSchema) //Model name is Problem and the structure is defined by ProblemSchema
module.exports=model; //Problem model is exported to be accessible outside the file
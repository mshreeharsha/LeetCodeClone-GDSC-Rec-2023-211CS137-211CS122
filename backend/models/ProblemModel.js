const mongoose=require('mongoose')
const {Schema,model}=mongoose
const ProblemSchema=Schema({
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    problemNo:{
      type:Number,
      required:true
    },
    difficulty:{
        type:String,
        default: "Medium",
        enum: ["Easy", "Medium","Hard"],
    },
    description:{
        type:String,
        required:true
    },
    sampleTestCases: [
        {
          input: {
            type: String,
            required: true,
          },
          output: {
            type: String,
            required: true,
          },
          explaination:{
            type: String
          }
        },
    ],
    constraints:[{
        type: String,
        required: true,
    }],
    category:{
        type: mongoose.ObjectId,
        ref: "Category",
    }
})

const problemModel=model('Problem',ProblemSchema) //Model name is Problem and the structure is defined by ProblemSchema
module.exports=problemModel; //Problem model is exported to be accessible outside the file
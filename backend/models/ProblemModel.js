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
        },
    ],
    constraints:[{
        type: String,
        required: true,
    }],
    category:{
        type: mongoose.ObjectId,
        ref: "Category",
    },
    soultion: {
        type: String,
        validate: {
          validator: function (value) {
            // Use a regular expression to validate YouTube video URLs
            return /^https:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)$/.test(value);
          },
          message: 'Invalid YouTube video link format',
        },
    }
})

const problemModel=model('Problem',ProblemSchema) //Model name is Problem and the structure is defined by ProblemSchema
module.exports=problemModel; //Problem model is exported to be accessible outside the file
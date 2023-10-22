const mongoose=require('mongoose')
const {Schema,model}=mongoose

const SubmissionSchema=Schema({
    ProblemId:{
        type:mongoose.ObjectId,
        ref:'Problem',
        required:true
    },
    UserId:{
        type:mongoose.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:["Accepted","Wrong Answer","Compile Error","Runtime Error"],
        required:true
    },
    language:{
        type:String,
        required:true
    },
    user_code:{
        type:String,
        required:true
    },
    passed:{
        type:Number,
    },
    hidden_testcases:{
        type:Number
    },
    errors:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
},{timestamps:true})

const SubmissionModel=model('Submission',SubmissionSchema)
module.exports=SubmissionModel
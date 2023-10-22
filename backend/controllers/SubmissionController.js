const SubmissionModel=require('../models/SubmissionModel')
const ProblemModel=require('../models/ProblemModel')
const UserModel=require('../models/UserModel')

const createSubmissionController=async(req,res)=>{
    try{
       const {problemId,userId,status,language,user_code,passed,hidden_testcases}=req.body
       if(!problemId)
       return res.send({success:'false',message:'Enter problem ID'})
       if(!userId)
       return res.send({success:'false',message:'Enter user ID'})
       if(!status)
       return res.send({success:'false',message:'Enter status'})
       if(!language)
       return res.send({success:'false',message:'Enter language'})
       if(!user_code)
       return res.send({success:'false',message:'Enter code'})

       const submission=await new SubmissionModel({
          ProblemId:problemId,
          UserId:userId,
          status:status,
          language:language,
          user_code:user_code,
          passed:status==='Wrong Answer'?passed:'',
          hidden_testcases:status==='Wrong Answer'?hidden_testcases:'',
        }).save()
        
        res.send({
           success:true,
           message:'Code successfully submitted',
           submission
        })
       
    }catch(error)
    {
        res.send({
            success:false,
            message:'Error in submitting code',
            error:error.message
        })
    }
}

const allSubmissionsController=async(req,res)=>{
   try{
     const {slug,email}=req.params
     console.log(email)
     if(!slug)
     return res.send({success:false,message:'Enter problem slug'})
     if(!email)
     return res.send({success:false,message:'Enter user email'})

     const problem=await ProblemModel.findOne({slug:slug})
     if(!problem)
     return res.send({success:false,message:'Problem slug does not exist'})
     const user=await UserModel.findOne({email:email})
     if(!user)
     return res.send({success:false,message:'User email does not exist'})
     const submissions=await SubmissionModel.find({ProblemId:problem._id,UserId:user._id})
     
     res.send({
        success:true,
        message:'All submissions successfully fetched',
        submissions
     })
   }catch(error){
       res.send({
        success:false,
        message:'Error in fetching submissions',
        error:error.message
       })
   }
}

module.exports={createSubmissionController,allSubmissionsController}
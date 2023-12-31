const ProblemModel=require('../models/ProblemModel')
const UserModel=require('../models/UserModel')
const slugify=require('slugify')

const createProblemController=async(req,res)=>{
  try {
    const {title,problemNo, difficulty, description, sampleTestCases ,givenTestCases,givenTestCasesOutput,hiddenTestCases,hiddenTestCasesOutput, constraints , category} = req.body;
    if(!title)
      return res.send({success:false,message:'Title is not entered'}) //checking if Title is entered
    if(!problemNo)
      return res.send({success:false,message:'Problem No is not entered'}) //checking if Problem No is entered
    if(!difficulty)
      return res.send({success:false,message:'Difficulty is not entered'}) //checking if Difficulty is entered
    if(!description)
      return res.send({success:false,message:'Description is not entered'}) //checking if description is entered
    if(!sampleTestCases)
      return res.send({success:false,message:'Sample Test Cases are not entered'}) //checking if sample Test Cases is entered
    if(!givenTestCases)
      return res.send({success:false,message:'Sample Test Cases for Piston are not entered'}) //checking if sample Test Cases for Pison is entered
    if(!givenTestCasesOutput)
      return res.send({success:false,message:'Sample Test Cases Outputs for Piston are not entered'}) //checking if sample Test Cases Output for Piston is entered
    if(!hiddenTestCases)
      return res.send({success:false,message:'Hidden Test Cases are not entered'}) //checking if Hidden Test Cases are entered
    if(!hiddenTestCasesOutput)
      return res.send({success:false,message:'Hidden Test Cases Outputs are not entered'}) //checking if Hidden Test Cases Outputs are entered
    if(!constraints)
      return res.send({success:false,message:'Constraints is not entered'}) //checking if constraints is entered
    if(!category)
      return res.send({success:false,message:'Category is not entered'}) //checking if category is entered

    const existingProblem=await ProblemModel.findOne({title:title}) 
    if(existingProblem) //Does not allow same Problem to be Entered again
    {
        return res.status(201).send({
            success:false,
            message:"Problem already exists"
        })
    }
    
    // Save the Problem to the database
    const newProblem = await new ProblemModel({
        title:title,
        slug:slugify(title),
        problemNo:problemNo,
        difficulty:difficulty, 
        description:description, 
        sampleTestCases:sampleTestCases , 
        givenTestCases:givenTestCases,
        givenTestCasesOutput:givenTestCasesOutput,
        hiddenTestCases:hiddenTestCases,
        hiddenTestCasesOutput:hiddenTestCasesOutput,
        constraints:constraints , 
        category:category
    }).save();  

    res.status(201).send({
      success: true,
      message: "Successfully Created",
      problem:{
        title:newProblem.title,
        slug:newProblem.slug,
        problemNo:problemNo,
        difficulty:newProblem.difficulty, 
        description:newProblem.description, 
        sampleTestCases:newProblem.sampleTestCases , 
        givenTestCases:newProblem.givenTestCases,
        givenTestCasesOutput:newProblem.givenTestCasesOutput,
        hiddenTestCases:newProblem.hiddenTestCases,
        hiddenTestCasesOutput:newProblem.hiddenTestCasesOutput,
        constraints:newProblem.constraints , 
        category:newProblem.category
      },
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Problem Creation failed",
      error: error.message,
    });
  }
};

const getAllProblemsController = async(req,res)=>{
    try {
        //For displaying fetching only required items, sampleTestCases and Description are not necessary
        const problems= await ProblemModel.find({}).populate('category').select("-sampleTestCases -constraints -description").sort({createdAt:-1});

        res.status(200).send({
            success:true,
            count:problems.length,
            message:'Fetched All Problems',
            problems
        });
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error in Getting the Problems',
            error:error.message
        })
    }
}

const getSingleProblemController = async(req,res)=>{
  try{
    const problem = await ProblemModel.findOne({slug:req.params.slug}).populate('category')
    res.status(201).send({
      success:true,
      message: 'Single Problem Fetched',
      problem
    })
  }
  catch(error){
    res.status(400).send({
      success:false,
      message:'Error in Fetching Single Problem',
      error:error.message
    })
  }
}

const getNextProblemController = async(req,res)=>{
  //Fetching Next or Prev Problem Based on the parameter passed
  try{
    const problem  = await ProblemModel.findOne({problemNo:Number(req.params.problemNo)})
    res.status(201).send({
      success:true,
      message:'Problem Fetched Successfully',
      slug:problem?.slug,
    })
  }
  catch(error){
    res.status(400).send({
      success:false,
      message:'Error in Fetching Problem',
      error:error.message
    })
  }
}

const getTotalNoOfProblems = async(req,res)=>{
  try {
    //Getting the total count of no of problems 
    const total = await ProblemModel.countDocuments({});
    res.status(200).send({
        success:true,
        total
    });
} catch (error) {
    res.status(400).send({
        success:false,
        message:'Error in Counting Total no of Problems',
        error
    });
}
}

const getProblemsFilter= async(req,res)=>{
  try {
    const {difficulty,tags,status}=req.body;
    const uid = req.params.uid
    let args={};
    if(difficulty.length>0){
        args.difficulty=difficulty;
    }
    if(tags.length>0){
        args.category=tags;
    }
    if(status.length===0){
      const problems=await ProblemModel.find(args).populate("category");
      return res.status(200).send({
        success:true,
        problems
    });
    }
    else{
      const user=await UserModel.findById(uid)
      if (!user) {
        return res.status(404).send({ 
          success:false,
          message: 'User not found' 
        });
      }
      if(status==='Solved'){
        const problems = await ProblemModel.find({ _id: { $in: user.solvedProblems } }).populate("category")
        return res.status(200).send({
          success:true,
          message:'Fetched Solved Problems Successfully',
          problems
        })
      }
      else if(status==='Attempted'){
        const problems = await ProblemModel.find({ _id: { $in: user.attemptedProblems } }).populate("category")
        return res.status(200).send({
          success:true,
          message:'Fetched Attempted Problems Successfully',
          problems
        })
      }
      else{
        const problems = await ProblemModel.find({}).populate("category")
        return res.status(200).send({
          success:true,
          message:'Fetched All Problems Successfully',
          problems
        })
      }
    }
  } 
  catch (error) {
    res.status(400).send({
        success:false,
        message:'Error in Filter Problems',
        error
    });
  }
}

const searchProblemController = async(req,res) => {
  try {
      const{keyword} = req.params;
      
      //$options: "i": The $regex operator performs a regular expression search on the specified field. In this case, it matches the keyword value in a case-insensitive manner ($options: "i").

      const results = await ProblemModel.find({
          $or: [
              {title :{$regex : keyword , $options: "i"}},
              {description :{$regex : keyword , $options: "i"}},
          ]
      }).populate("category");
      res.status(201).send({
        success:true,
        message:'Problems Fetched Successfully',
        results
      })
  } catch (error) {
      res.status(400).send({
          success: false,
          message: "Error in search Problem api",
          error
      });
  }
}

module.exports={createProblemController,getAllProblemsController,getSingleProblemController,getNextProblemController,getTotalNoOfProblems,getProblemsFilter,searchProblemController}
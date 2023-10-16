const ProblemModel=require('../models/ProblemModel')
const slugify=require('slugify')

const createProblemController=async(req,res)=>{
  try {
    const {title, difficulty, description, sampleTestCases , constraints , category} = req.body;
    if(!title)
      return res.send({success:false,message:'Title is not entered'}) //checking if Title is entered
    if(!difficulty)
      return res.send({success:false,message:'Difficulty is not entered'}) //checking if Difficulty is entered
    if(!description)
      return res.send({success:false,message:'Description is not entered'}) //checking if description is entered
    if(!sampleTestCases)
      return res.send({success:false,message:'Sample Test Cases are not entered'}) //checking if sample Test Cases is entered
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
        difficulty:difficulty, 
        description:description, 
        sampleTestCases:sampleTestCases , 
        constraints:constraints , 
        category:category
    }).save();  

    res.status(201).send({
      success: true,
      message: "Successfully Created",
      problem:{
        title:newProblem.title,
        slug:newProblem.slug,
        difficulty:newProblem.difficulty, 
        description:newProblem.description, 
        sampleTestCases:newProblem.sampleTestCases , 
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

        console.log(problems);
        res.status(200).send({
            success:true,
            count:problems.length,
            message:'Fetched All Problems',
            problems
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            success:false,
            message:'Error in Getting the Problems',
            error:error.message
        })
    }
}

const getSingleProblemController = async(req,res)=>{
  try{
    const problem = ProblemModel.findOne({slug:req.params.slug}).populate('category')
    res.send(201).send({
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
module.exports={createProblemController,getAllProblemsController,getSingleProblemController}
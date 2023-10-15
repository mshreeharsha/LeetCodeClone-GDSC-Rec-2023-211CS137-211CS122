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

module.exports={createProblemController}
const BoilerPlateModel=require('../models/BoilerPlateCodeModel')

const addBoilerPlateCodeController =async(req,res)=>{
    try {
        const {problemId,boilerPlate} = req.body;
        if(!problemId)
          return res.send({success:false,message:'ProblemId is not entered'}) //checking if ProblemId is entered
        if(!boilerPlate)
          return res.send({success:false,message:'Boiler Plate Code is not entered'}) //checking if Boiler Plate Code is entered
        
        const existingCode=await BoilerPlateModel.findOne({problemId:problemId}) 
        if(existingCode) //Does not allow same Problem Code to be Entered again
        {
            return res.status(201).send({
                success:false,
                message:"Problem Code already exists"
            })
        }
        
        // Save the Problem Code to the database
        const newProblemCode = await new BoilerPlateModel({
            problemId:problemId,
            boilerPlate:boilerPlate
        }).save();  
    
        res.status(201).send({
          success: true,
          message: "Successfully Created",
          problemBoilerPlate:{
            problemId:newProblemCode.problemId,
            boilerPlate:newProblemCode.boilerPlate
          },
        });
      } catch (error) {
        res.status(404).send({
          success: false,
          message: "Problem Code failed",
          error: error.message,
        });
      }
}

module.exports={addBoilerPlateCodeController}
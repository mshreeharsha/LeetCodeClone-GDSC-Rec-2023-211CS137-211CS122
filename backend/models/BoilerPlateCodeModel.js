const mongoose=require('mongoose')
const {Schema,model}=mongoose
const BoilerPlateCodeSchema=Schema({
    problemId:{
        type: mongoose.ObjectId,
        ref: "Problem",
    },
    boilerPlate: [
        {
          language: {
            type: String,
            required: true,
          },
          initialCode: {
            type: String,
            required: true,
          },
        },
    ],
})

const boilerPlateCodeModel=model('BoilerPlate',BoilerPlateCodeSchema) //Model name is BoilerPlate and the structure is defined by BoilerPlateCodeSchema
module.exports=boilerPlateCodeModel; //BoilerPlate model is exported to be accessible outside the file
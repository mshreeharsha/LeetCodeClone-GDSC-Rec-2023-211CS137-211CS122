const UserModel=require('../models/UserModel')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')

//Function to Generate Json Web Token
const createToken=(_id)=>{
  return jwt.sign({_id},process.env.JWT_TOKEN,{expiresIn: '3d'});
}

const registerController=async(req,res)=>{
  try {
    const {username, email, password} = req.body;
    if(!username)
      return res.send({success:false,message:'Username is not entered'}) //checking if username is entered
    if(!email)
      return res.send({success:false,message:'Email is not entered'}) //checking if email is entered
    if(!password)
      return res.send({success:false,message:'Password is not entered'}) //checking if password is entered

    const existingUser=await UserModel.findOne({email:email}) 
    if(existingUser) //Does not allow same email to be registered again
    {
        return res.status(201).send({
            success:false,
            message:"User already exists"
        })
    }

    // Hash the password using bcrypt module (encoding password)
    const hashedPassword = await bcrypt.hashSync(password, 10);
    
    // Save the user to the database
    const newUser = await new UserModel({
      username: username,
      email: email,
      password: hashedPassword,
    }).save();  //creating a user object to be sent to the client side

    //Creating a Token
    const token=createToken(newUser._id);
    res.status(201).send({
      success: true,
      message: "Successfully registered",
      user:{
        username:newUser.username,
        email:newUser.email,
      },
      token: token
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

const loginController = async(req,res)=>{
  try{
    const {email, password} = req.body;
    if(!email)
      return res.send({success:false,message:'Email is not entered'}) //checking if email is entered
    if(!password)
      return res.send({success:false,message:'Password is not entered'}) //checking if password is entered

    //Checking if the User is registered or not
    const user=await UserModel.findOne({email})
    if(!user){
      return res.send({success:false,message:'Email Not Found!! Please Register!!'})
    }

    //Comparing the Stored Password with the user entered Password
    const match = await bcrypt.compareSync(password,user.password)

    if(!match){
      return res.send({success:false,message:'Incorrect Password!!'})
    }

    const token=createToken(user._id);
    res.status(201).send({
        success:true,
        message:'User Logged in Successfully',
        user:{
          userId:user._id,
          username:user.username,
          email:user.email,
        },
        token:token
    })
  }
  catch(error){
    res.status(404).send({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
}

const addToListController = async(req,res)=>{
  try{
    const {status,pid}=req.body
    const uid=req.params.uid
    const user = await UserModel.findById(uid);
    if (!user) {
      return res.status(404).send({ 
        success:false,
        message: 'User not found' 
      });
    }
    if(status==="Attempted"){
      const solvedIndex= user.solvedProblems.indexOf(pid);
      if(solvedIndex===-1){
        const attemptedIndex = user.attemptedProblems.indexOf(pid);
        if (attemptedIndex === -1) {
          user.attemptedProblems.push(pid);
        }
        await user.save();
      }
    }
    else if(status==="Solved"){
      const solvedIndex= user.solvedProblems.indexOf(pid);
      if(solvedIndex===-1){
        const attemptedIndex = user.attemptedProblems.indexOf(pid);
        if (attemptedIndex === -1) {
          user.solvedProblems.push(pid);
        }
        else if(attemptedIndex !==-1){
          // Remove the problemId from "AttemptedProblems"
          user.attemptedProblems.splice(attemptedIndex, 1);
          user.solvedProblems.push(pid);
        }
        await user.save();
      }
    }
    res.status(201).send({
      success:true,
      message:'Problem Id Successfully added to the User List'
    })
  }
  catch(error){
    res.status(400).send({
      success:false,
      message:error.message
    })
  }
}

const getUserDetailsController = async(req,res)=>{
  try{
    const uid=req.params.uid
    const user = await UserModel.findById(uid)
    res.status(200).send({
      success:true,
      message:'User Fetched Successfully',
      user
    })
  }
  catch(error){
    res.status(404).send({
      success: false,
      message:error.message
    })
  }
}

module.exports={registerController,loginController,addToListController,getUserDetailsController}
const express=require('express')
const dotenv=require('dotenv')
//dotenv is used to set environement variables and should not be exported to public repositories.

const morgan=require('morgan')
//morgan prints the list of API requests along with status codes
// called on the terminal of the backend server 
//which helps in debugging errors 
const cors=require('cors')

const mongoose = require('mongoose');
//mongoose is used for object data modelling. Structure to document databases

//For Deployment
const path = require('path')

const userRoutes=require('./routes/UserRoute')
const categoryRoutes=require('./routes/CategoryRoute')
const problemRoutes=require('./routes/ProblemRoute')
const boilerPlateCodeRoutes=require('./routes/BoilerPlateCodeRoute')
const submissionRoutes=require('./routes/SubmissionRoute')

const app=express()

dotenv.config();

console.log(process.env.url)
const connect = mongoose.connect(process.env.url,{useNewUrlParser: true}, { useUnifiedTopology: true },  {useCreateIndex: true});
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });
//Connection with the Mongo DB atlas database 


//middlewares
app.use(express.json())
//express.json is used to parse the request bodies of POST request

app.use(morgan('dev'))
app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL
}))

app.use(express.static(path.join(__dirname,'./frontend/build')))

//routes
app.use('/api/user',userRoutes)
app.use('/api/categories',categoryRoutes)
app.use('/api/problems',problemRoutes)
app.use('/api/boilerPlate',boilerPlateCodeRoutes)
app.use('/api/submissions',submissionRoutes)


app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,'./frontend/build/index.html'))
})

const PORT=process.env.PORT||5000;
const development=process.env.DEV_MODE;
app.listen(PORT,()=>{
    console.log(`Server running on ${development} mode on port ${PORT}`);
})
//server socket with PORT 5000 listening for requests



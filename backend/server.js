const express=require('express')
const dotenv=require('dotenv')
//dotenv is used to set environement variables and should not be exported to public repositories.

const morgan=require('morgan')
//morgan prints the list of API requests along with status codes
// called on the terminal of the backend server 
//which helps in debugging errors 

const mongoose = require('mongoose');
//mongoose is used for object data modelling. Structure to document databases

const userRoutes=require('./routes/UserRoute')

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

//routes
app.use('/api/user',userRoutes)



const PORT=process.env.PORT||5000;
const development=process.env.DEV_MODE;
app.listen(PORT,()=>{
    console.log(`Server running on ${development} mode on port ${PORT}`);
})
//server socket with PORT 5000 listening for requests



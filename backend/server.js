const express=require('express')
const dotenv=require('dotenv')
const morgan=require('morgan')

const mongoose = require('mongoose');
const cors=require('cors')
const app=express()

dotenv.config();

console.log(process.env.url)
const connect = mongoose.connect(process.env.url,{useNewUrlParser: true}, { useUnifiedTopology: true },  {useCreateIndex: true});
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });


//middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors({credentials:true,origin:process.env.FRONTEND_URL}))


const PORT=process.env.PORT||5000;
const development=process.env.DEV_MODE;
app.listen(PORT,()=>{
    console.log(`Server running on ${development} mode on port ${PORT}`);
})



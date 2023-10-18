import React,{useState,useEffect} from 'react';
import axios from 'axios' 
import {useParams} from 'react-router-dom'
import { baseUrl } from '../../baseUrl';

const ProblemDesc = () => {
    const [problem,setProblem]=useState({}) //setting the state for the fetched problem
    const params=useParams()  // params object contains key:value pairs of all attributes in the route parameters

    const fetchProblem=async()=>{ //to fetch single problem object using route parameters value slug
       try{
        const {data}=await axios.get(`${baseUrl}/api/problems/single-problem/${params.slug}`)
         if(data.success)
         {
           setProblem(data.problem) // setting the response object to state if data is fetched correctly
         }
         else{
          alert(data.message) 
         }
       }catch(error)
       {
         alert('Single problem is not fetching')
       }
    }
   useEffect(()=>{
     fetchProblem()
   },[])


   const difficultyStyles={
     'color':problem.difficulty==="Easy"?"Green":problem.difficulty==="Medium"?"Gold":"Red",
     'font-weight':'bold'
   } //setting the colour of the problem based on difficulty


  return (
    <div style={{'padding':'1rem','overflowY':'scroll','max-height':'45rem'}}>

      {/* Object.keys() checks if the objects contains atleast one key*/}
      {Object.keys(problem).length!=0?(<>
         <h4>{problem.problemNo}.{problem.title}</h4>
          <div>
            <span style={difficultyStyles}>{problem.difficulty}</span>
          </div>

         {/* Problem description contains \n escape characters to indicate a new line*/}
       {problem.description && problem.description.split('\n').map((para)=>(
          <p>
            {para}
          </p>
       ))}

       {problem.sampleTestCases.map((testcase,index)=>(
        <>
          <span><strong>Example {index+1}:</strong></span>
          <div style={{'border-left':'2px solid #999','padding':'1rem',
          'margin-top':'0.5rem','margin-bottom':'1rem'}}>
            <p><strong>Input: </strong>{testcase.input}</p>
            <p><strong>Output: </strong>{testcase.output}</p>
            {testcase.explaination &&
             <p><strong>Explaination: </strong>{testcase.explaination}</p>}
          </div>
        </>  
       ))}

      </>    
      ):<h1>Loading...</h1>}
      
      
    </div>
       
  );
}

export default ProblemDesc

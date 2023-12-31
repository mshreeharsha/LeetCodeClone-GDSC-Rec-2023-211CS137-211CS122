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
   },[params.slug])


   const difficultyStyles={
     'color':problem.difficulty==="Easy"?"Green":problem.difficulty==="Medium"?"Gold":"Red",
     'fontWeight':'bold'
   } //setting the colour of the problem based on difficulty


  return (
    <div style={{'padding':'1rem','maxHeight':'80vH','overflowY':'auto','paddingBottom':'2rem'}}>

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
          <div style={{'borderLeft':'2px solid #999','padding':'1rem',
          'marginTop':'0.5rem','marginBottom':'1rem'}}>

            <p><strong>Input: </strong>{testcase.input.map((tc,i)=>{
              return <span key={i}>
                {tc.variableName} = {tc.variableValue} {(i!==testcase.input.length-1)?' , ':''}
              </span>
            })}</p>
            <p><strong>Output: </strong>{testcase.output}</p>
            {testcase.explaination &&
             <p><strong>Explaination: </strong>{testcase.explaination}</p>}
          </div>
        </>  
       ))}

       <div>
         <span><strong>Constraints</strong></span>
         {problem.constraints.map((constraint)=>(
            <li style={{'lineHeight':'2rem'}}>{constraint}</li>
         ))}
       </div>

      </>    
      ):<h1>Loading...</h1>}
    </div>

  );
}

export default ProblemDesc

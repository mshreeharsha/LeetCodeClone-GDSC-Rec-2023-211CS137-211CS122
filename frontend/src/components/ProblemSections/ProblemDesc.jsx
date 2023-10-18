import React,{useState,useEffect} from 'react';
import axios from 'axios' 
import { baseUrl } from '../../baseUrl';
const ProblemDesc = () => {
    const [problem,setProblem]=useState({})

    const fetchProblem=async()=>{
       try{
        const {data}=await axios.get(`${baseUrl}/api/problems/single-problem`)
        
       }catch(error)
       {
         alert('Single problem is not fetching')
       }
    }
   useEffect(()=>{
     fetchProblem()
   },[])

  return (
    <div>
       {problem.description}
    </div>
  );
}

export default ProblemDesc

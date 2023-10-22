import React,{useState,useEffect} from 'react';
import axios from 'axios'
import { baseUrl } from '../../baseUrl';
import { useAuthContext } from '../../context/AuthContext'; 
const Submissions = ({slug,email}) => {
  const [submissions,setSubmissions]=useState([])
  const fetchSubmissions=async()=>{
     const {data}=await axios.get(`${baseUrl}/api/submissions/all-submissions/${slug}/${email}`)
     console.log(data)
  }

  useEffect(()=>{
   fetchSubmissions()
  },[])
  return (
    <div style={{'padding':'1rem'}}>
       <h3>Submissions</h3>
    </div>
  );
}

export default Submissions;

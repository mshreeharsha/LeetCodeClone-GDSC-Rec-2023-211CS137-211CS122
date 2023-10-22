import React,{useState,useEffect} from 'react';
import {options} from '../../assets/languages'
import axios from 'axios'
import { baseUrl } from '../../baseUrl';

import {CDropdown,CDropdownItem,CDropdownToggle,CDropdownMenu} from '@coreui/react'
import { useAuthContext } from '../../context/AuthContext'; 
const Submissions = ({slug,email,submissionCode,setSubmissionCode,
  editorCode,setEditorCode,setSplit}) => {
  const [submissions,setSubmissions]=useState([])
  const [statusActive,setStatusActive]=useState('')
  const [languageActive,setLanguageActive]=useState('')
  const [statusOptions,setStatusOptions]=useState(['Accepted','Wrong Answer','Compile Error','Runtime Error'])


  const fetchSubmissions=async()=>{
    try{
     const {data}=await axios.get(`${baseUrl}/api/submissions/all-submissions/${slug}/${email}`)
     if(data.success)
     {
        setSubmissions(data.submissions)
     }
     else
     {
        alert(data.message)
     }
    }
    catch(error)
    {
       alert('Error in fetching submissions')
    }
  }

  useEffect(()=>{
   fetchSubmissions()
  },[])
  return (
    <div style={{'padding':'2rem'}}>
       <h3>Submissions</h3>
       <div>
        <>
          <CDropdown size="sm" style={{'margin-right':'1rem','width':'8rem'}}>
            <CDropdownToggle color="white" size="sm"><strong>Status</strong></CDropdownToggle>
            <CDropdownMenu size="sm" style={{'max-height':'15rem','overflow-y':'auto','gap':'0.5rem'}}>
             {statusOptions.map((option,index)=>(
              <>
                 <CDropdownItem size="sm" component="button"
                  className={`${option===statusActive?'active':''}`}
                 onClick={()=>setStatusActive(option)} style={{ fontSize: '1rem',
                 'height':'2rem','font-weight':'bold','margin-bottom':'0rem'}} >
                  {option}</CDropdownItem>
              </>
             ))}
            </CDropdownMenu>
          </CDropdown>
            
          <CDropdown size="sm" style={{'width':'8rem'}}>
              <CDropdownToggle color="white" size="sm"><strong>Languages</strong></CDropdownToggle>
             <CDropdownMenu size="sm" style={{'max-height':'15rem','overflow-y':'auto'}}>
                {options.map((option,index)=>(
                  <>
                 <CDropdownItem size="sm" component="button"
                  className={`${option.value===languageActive?'active':''}`}
                 onClick={()=>setLanguageActive(option.label)} style={{ fontSize: '1rem',
                 'height':'2rem','font-weight':'bold','margin-bottom':'0rem'}} >
                  {option.label}</CDropdownItem>
              </>
                ))}
             </CDropdownMenu>
          </CDropdown>
          <span style={{'font-weight':'bold','margin-left':'2rem'}}>
              Submitted At
          </span>
       </>

       {submissions
       .filter((submission)=>{
        if(statusActive==='')
        return submission
        else if(statusActive===submission.status)
        return submission
       })
       .filter((submission)=>{
        if(languageActive==='')
        return submission
        else if(languageActive===submission.language)
        return submission
       })
       .map((submission,index)=>(
          <div style={{'border-bottom':'2px solid black','height':'3rem','padding':'0.5rem',
          'cursor':'pointer'}}
          onClick={()=>{setSubmissionCode(submission);setEditorCode(false);setSplit(false)}}>
             <span style={{'margin-right':'6rem','font-weight':'bold',
             'margin-left':'2rem','color':`${submission.status==='Accepted'?'green':'red'}`}}>
                {submission.status}
             </span>
             <span>
                {submission.language}
             </span>
             <span style={{'margin-left':'3rem'}}>
              {`${new Date(submission.createdAt).getDate()}/${new Date(submission.createdAt).getMonth()+1}/${new Date(submission.createdAt)
              .getFullYear()} ${new Date(submission.createdAt).getHours()}:${new Date(submission.createdAt).getMinutes()}:${new Date(submission.createdAt).getSeconds()}`}
             </span>
          </div>
       ))}

       </div>
    </div>
  );
}

export default Submissions;

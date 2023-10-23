import React,{useState} from 'react';
import ClipLoader from "react-spinners/ClipLoader"
import '../styles/Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp,faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../../context/AuthContext';
const Footer = ({handleSplitter,split,runCodeHandler,
  submitButtonHandler,pending,run,submit}) => {
   const [hover,setHover]=useState(false)  //hover button

   //Obtaining the auth context to check whether user is Logged in or not
   const [auth,setAuth]=useAuthContext()

  return (
    <div className="problem-footer" style={{'position':'absolute','bottom':'0','width':'48%','display':'flex','alignItems':'center','justifyContent':'space-between'}}>
      {!pending?(
         <div style={{cursor:'pointer',color:`${hover===true?'black':'grey'}`}} 
         onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} 
         onClick={handleSplitter}>Console {split?<FontAwesomeIcon icon={faChevronDown}
        />:<FontAwesomeIcon icon={faChevronUp}/>}
      </div>
      )
      :(
        <div style={{'display':'flex','align-items':'center'}}>
          <h6 style={{'margin-right':'0.5rem'}}>Pending...</h6>
          <ClipLoader
          loading={pending}
          size={10}
          aria-label="Loading Spinner"
          data-testid="loader"
          />
        </div>
      )}
      
      <ul style={{ display: 'flex', alignItems: 'center' ,'marginTop':'1rem' }}>
      <button className="btn btn-secondary" style={{ marginRight: '10px' }} 
      onClick={runCodeHandler} disabled={pending?true:false}>
        <span>Run</span>
        {(pending && run)?<ClipLoader
          loading={pending}
          size={10}
          aria-label="Loading Spinner"
          data-testid="loader"
          />:''}
         
        </button>
      {auth.user===null?<button className="btn btn-danger" 
       disabled={true}>
        <span>Login To Submit</span></button>:
        <button className="btn btn-success" onClick={submitButtonHandler}
       disabled={pending?true:false}>
        <span>Submit</span>
         {(pending && submit)?<ClipLoader
          loading={pending}
          size={10}
          aria-label="Loading Spinner"
          data-testid="loader"
          />:''}
        </button> }
      </ul>
    </div>  
  );
}

export default Footer;

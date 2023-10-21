import React,{useState} from 'react';
import '../styles/Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp,faChevronDown } from '@fortawesome/free-solid-svg-icons';
const Footer = ({handleSplitter,split,runCodeHandler,submitButtonHandler,pending}) => {
   const [hover,setHover]=useState(false)

  return (
    <div className="problem-footer" style={{'position':'absolute','bottom':'0','width':'48%','display':'flex','alignItems':'center','justifyContent':'space-between'}}>
      {!pending?(
         <div style={{cursor:'pointer',color:`${hover===true?'black':'grey'}`}} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onClick={handleSplitter}>Console {split?<FontAwesomeIcon icon={faChevronDown}
        />:<FontAwesomeIcon icon={faChevronUp}/>}
      </div>
      ):'Pending...'}
      
      <ul style={{ display: 'flex', alignItems: 'center' ,'marginTop':'1rem' }}>
      <button className="btn btn-secondary" style={{ marginRight: '10px' }} onClick={runCodeHandler}>Run</button>
      <button className="btn btn-success" onClick={submitButtonHandler}>Submit</button>
      </ul>
    </div>  
  );
}

export default Footer;

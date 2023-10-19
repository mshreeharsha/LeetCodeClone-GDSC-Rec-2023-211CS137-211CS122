import React from 'react';
import '../styles/Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp,faChevronDown } from '@fortawesome/free-solid-svg-icons';
const Footer = ({handleSplitter,split,runCodeHandler}) => {


  return (
    <div className="problem-footer"
     style={{'position':'absolute','bottom':'0','width':'57rem',
     display:'flex','align-items':'center','justify-content':'space-between'}}>
      <div style={{cursor:'pointer'}}
    onClick={handleSplitter}>Console {split?<FontAwesomeIcon icon={faChevronDown}
        />:<FontAwesomeIcon icon={faChevronUp}/>}
      </div>
      <ul style={{ display: 'flex', alignItems: 'center' ,'margin-top':'1rem' }}>
      <button style={{ marginRight: '10px' }} onClick={runCodeHandler}>Run</button>
      <button>Submit</button>
      </ul>


    </div>  
  );
}

export default Footer;

import React from 'react';
import '../styles/Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp,faChevronDown } from '@fortawesome/free-solid-svg-icons';
const Footer = ({handleSplitter,split}) => {

  return (
    <div className="problem-footer"
     style={{'position':'absolute','bottom':'0',cursor:'pointer'}}
    onClick={handleSplitter}>
      Console {split?<FontAwesomeIcon icon={faChevronDown}
        />:<FontAwesomeIcon icon={faChevronUp}/>}
    </div>  
  );
}

export default Footer;

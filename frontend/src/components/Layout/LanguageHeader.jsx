import React from 'react';
import Select from 'react-select'
import {options,defaultValue} from '../../assets/languages'

const LanguageHeader = ({language,setLanguage}) => {

const customStyles={                    
    control: (baseStyles, state) => ({   //styles of the select tag
      ...baseStyles,
      width:'8rem',
      
    }),
     menu: (baseStyles, state) => ({   //styles of the options tag
    ...baseStyles,
    maxHeight: '200px',
    overflowY:'scroll',
     })
  }

  return (
    <div className='navbar navbar-expand-lg bg-body-tertiary'>
       <div className='container-fluid'> 
          <ul className='navbar-nav'>
            <Select options={options} 
            value={language}
            onChange={(selectedOption) => setLanguage(selectedOption)}
            styles={customStyles}
            defaultValue={defaultValue}
            />
          </ul>
       </div>
    </div>
  );
}

export default LanguageHeader;

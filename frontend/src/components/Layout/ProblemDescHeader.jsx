import React,{useState} from 'react';

const ProblemDescHeader = ({active,setActive}) => {
    const handleDescClick=()=>{
       const newActive={...active}
       newActive.description=true
       newActive.submissions=false
       setActive(newActive)
    } 
    //Keeping only one of description or submissions tab active at any point of time in the left section

    const handleSubClick=()=>{
        const newActive={...active}
       newActive.submissions=true
       newActive.description=false
       setActive(newActive)
    }
    //Keeping only one of description or submissions tab active at any point of time in the left section
  return (
    <div className='navbar navbar-expand-lg bg-body-tertiary'>
       <div className='container-fluid'> 
          <ul className='navbar-nav'>
            <li className='nav-item' style={{'marginRight':'1rem','cursor':'pointer','color':
            `${active.description?'#111':'#777'}`}} onClick={handleDescClick}>
                Description
            </li>
            <li className='nav-item' style={{'marginRight':'1rem','cursor':'pointer','color':
            `${active.submissions?'#111':'#777'}`}} onClick={handleSubClick}>
                Submissions
            </li>
          </ul>
       </div>
    </div>
  );
}

export default ProblemDescHeader;

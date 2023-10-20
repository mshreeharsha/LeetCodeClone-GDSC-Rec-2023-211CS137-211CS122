import React from 'react';

const TestCaseHeader = ({active,setActive,raw,setRaw}) => {

    const handleTestClick=()=>{
       const newActive={...active}
       newActive.testcase=true
       newActive.result=false
       setActive(newActive)
    } 
    //Keeping only one of description or submissions tab active at any point of time in the left section

    const handleResultClick=()=>{
        const newActive={...active}
       newActive.result=true
       newActive.testcase=false
       setActive(newActive)
    }
    //Keeping only one of description or submissions tab active at any point of time in the left section

  return (
    <div className='navbar navbar-expand-lg bg-body-tertiary'>
       <div className='container-fluid'> 
          <ul className='navbar-nav'>
            <li className='nav-item' style={{'margin-right':'1rem','cursor':'pointer','color':
            `${active.testcase?'#111':'#777'}`}} onClick={handleTestClick}>
                TestCase
            </li>
            <li className='nav-item' style={{'margin-right':'1rem','cursor':'pointer','color':
            `${active.result?'#111':'#777'}`}} onClick={handleResultClick}>
                Result
            </li>
          </ul>
          {active.testcase && (
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li onClick={()=>setRaw(!raw)} style={{'cursor':'pointer',
              'color':`${raw?'black':'grey'}`,'border-bottom':`${raw?'2px solid #999':''}`}}>Custom test case</li>
          </ul>
            )}
       </div>
    </div>
  );
}

export default TestCaseHeader;

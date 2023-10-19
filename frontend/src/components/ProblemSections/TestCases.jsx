import React from 'react';

const TestCases = ({raw,testcases}) => {
  const buttonStyles={
    
  }
  return (
    <div style={{'padding':'1rem'}}>
      {raw?(
        <div>Raw test case</div>
      ):(
        <div style={{'display':'flex','align-items':'center'}}>
          {testcases.map((testcase,index)=>(
            <li style={{'list-style-type':'none','margin-right':'2rem'}}>Case {index+1}</li>
          ))}
        </div>
      )
      }     
    </div>
  );
}

export default TestCases;

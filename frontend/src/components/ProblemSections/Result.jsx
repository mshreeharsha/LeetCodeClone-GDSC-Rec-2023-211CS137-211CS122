import React,{useState} from 'react';
import ClipLoader from "react-spinners/ClipLoader"
import './TestButton.css'

const Result = ({testcases,accepted,correctOutput,raw,run,submit,
  passed,success,totalTestCases,pending,customOutput,
  customInput,compileError,infLoopError}) => {
  const [btnTest,setBtnTest]=useState(0)  // Checks which button test case is clicked. 

  const handleTestCase=(index)=>{
      setBtnTest(index)
  }
  return (
    <div style={{'padding':'1rem','paddingBottom':'0rem','width':'98%'}}>
      {(!raw && run && !pending && !compileError && infLoopError===false)?(<>
         {accepted===true?
         <h4 style={{'color':'green'}}>Accepted</h4>:
         <h4 style={{'color':'red'}}>Wrong Answer</h4>}
        <div style={{'display':'flex','align-items':'center'}}>
          {testcases?.map((testcase,index)=>(
            <button className={`test-btn ${btnTest===index?'active':''}`} 
            onClick={()=>handleTestCase(index)} >
              <div style={{
                height: '0.3rem',
                width: '0.3rem',
                borderRadius: '50%',
                backgroundColor: `${correctOutput[index]===true?'green':'red'}`, 
                marginRight:'0.3rem'
              }}></div>
              <span>Case {index+1}</span>
            </button>
              
          ))}
        </div>
         <p>Input</p>
        {testcases?.map((testcase,index)=>(  
          <div style={{'margin':'1rem'}}>
            {index===btnTest && testcase?.input.map((inp)=>(
              <>
              <div style={{'marginTop':'1rem','width':'100%','background-color':'#aaa','marginBottom':'1rem'}}>
                 <p>{inp.variableName} = {inp.variableValue}</p>
              </div>
              </>
            ))}
            {index===btnTest && (
              <>
            <div style={{'marginTop':'1rem','width':'100%','background-color':'#aaa','marginBottom':'1rem'}}>
                <p>Expected</p>
                <span>{testcase.output}</span>
            </div>
            </>
            )}
          </div>
        ))}  
      </>)
      :(raw && run && !pending && !compileError && infLoopError===false)?(
        <>
          <h5>Custom Input</h5>
          <div style={{'padding':'1rem','paddingBottom':'0rem','height':'10rem','width':'98%'}}>
            {customInput?.map((inp,index)=>(
               <div style={{'border':'2px solid black',
                 'margin-bottom':'1rem','padding':'0.5rem'}}>
                 <h6>Input {index+1}</h6>
                 {inp?.split('\n').map((i)=>(
                   <>
                     <p style={{'line-height':'0.5rem'}}>{i}</p>
                   </>
                 ))}
                 <p><strong>Output {index+1}:</strong> {customOutput[index]}</p>
                 {console.log(customOutput)}
               </div>
            ))}
          </div>
        </>
      )
      :((run || submit) && !pending && compileError)?
      (
        <>
          <h3 style={{'color':'red'}}>Compile error</h3>
          <p style={{'border':'2px solid red','padding':'1rem',
          'color':'red'}}>{compileError}</p>
        </>
      )
      :((run || submit) && !pending && infLoopError===true)?
      (
        <>
          <h3 style={{'color':'red'}}>Runtime error</h3>
          <p style={{'color':'red'}}>Infinite Loop</p>
        </>
      )
      :((run || submit) && pending)?
      (
        <>
          <ClipLoader
          loading={pending}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
          />
        </>
      )
      :(submit && !pending && !success)?
      (
        <>
          <h5 style={{'color':'red'}}>Wrong Answer</h5>
          <div style={{'color':'red'}}>{passed}/{totalTestCases} passed</div>
        </>
      )
      :(submit && !pending && success)? 
      (
        <>
           <h5 style={{'color':'green'}}>All Test cases passed</h5>
           <div style={{'color':'green'}}>{passed}/{totalTestCases} passed</div>
        </>
      )
      :'Click on run button to show result'}
        
    </div>
  );
}

export default Result;

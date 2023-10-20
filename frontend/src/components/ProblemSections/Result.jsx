import React,{useState} from 'react';
import './TestButton.css'

const Result = ({testcases,raw,run,pending,customOutput,customInput}) => {
  const [btnTest,setBtnTest]=useState(0)  // Checks which button test case is clicked. 

  const handleTestCase=(index)=>{
      setBtnTest(index)
  }
  return (
    <div style={{'padding':'1rem','paddingBottom':'0rem','width':'98%'}}>
      {(!raw && run)?(<>
         <h4 style={{'color':'green'}}>Accepted</h4>
        <div style={{'display':'flex','align-items':'center','margin-bottom':'1rem'}}>
          {testcases?.map((testcase,index)=>(
            <button className={`test-btn ${btnTest===index?'active':''}`} 
            onClick={()=>handleTestCase(index)} >
              <div style={{
                height: '0.3rem',
                width: '0.3rem',
                borderRadius: '50%',
                backgroundColor: 'green', 
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
            <div style={{'marginTop':'1rem','width':'100%','background-color':'#aaa','marginBottom':'1rem'}}>
                <p>Expected</p>
                <span>{testcase.output}</span>
            </div>
            )}
          </div>
        ))}  
      </>):(raw && run && !pending)?(
        <>
          <div>
            Custom input result
          </div>
          <div>
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
                 
               </div>
            ))}
          </div>
        </>
      )
      :(raw && run && pending)?'Pending...':'Click on run button to show result'}
        
    </div>
  );
}

export default Result;

import React,{useState,useEffect} from 'react';
import './TestButton.css'

const TestCases = ({raw,testcases,custom,setCustom}) => {
  const [btnTest,setBtnTest]=useState(0) //Checks which button test case is clicked

  const handleTestCase=(index)=>{
      setBtnTest(index)
  }
  
  return (
    <div style={{'padding':'1rem','height':'12rem','overflow-y':'auto'}}>
      {raw?(
        <div className='form-control'>
          <textarea value={custom} style={{'width':'53.5rem',
          'height':'10rem','border':'0px solid white',outline: 'none'}}
          onChange={(e)=>setCustom(e.target.value)}/>
        </div>
      ):(
        <>
        <div style={{'display':'flex','align-items':'center','margin-bottom':'1rem'}}>
          {testcases?.map((testcase,index)=>(
            <button className={`test-btn ${btnTest===index?'active':''}`} 
            onClick={()=>handleTestCase(index)} >
              <div style={{
                height: '0.3rem',
                width: '0.3rem',
                borderRadius: '50%',
                // backgroundColor: 'green', 
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
              <div style={{'padding':'0.1rem','width':'50rem','background-color':'#aaa','margin-bottom':'1rem'}}>
                 <p>{inp.variableName} = {inp.variableValue}</p>
              </div>
            ))}
          </div>
        ))}

        
        </>
      )
      }     
    </div>
  );
}

export default TestCases;

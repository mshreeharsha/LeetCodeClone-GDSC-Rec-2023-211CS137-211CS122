import Layout from '../components/Layout/Layout';
import React,{useEffect,useState} from 'react'
import Footer from '../components/ProblemSections/Footer'
import ProblemDesc from '../components/ProblemSections/ProblemDesc';
import Code from '../components/ProblemSections/Code';
import TestCases from '../components/ProblemSections/TestCases'
import ProblemDescHeader from '../components/Layout/ProblemDescHeader';
import Submissions from '../components/ProblemSections/Submissions';
import TestCaseHeader from '../components/Layout/TestCaseHeader';
import Result from '../components/ProblemSections/Result';
import './styles/split.css'
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import { useParams } from 'react-router-dom';

const ProblemDescription = () => {

  //to obtain Slug from the URL
  const params=useParams()
  

   const [active,setActive]=useState({ //toggle one of the above two components in the left section
        description:true,
        submissions:false,
    })
    const [code,setCode]=useState('')                  //The code written in the code editor by the user
    const [customOutput,setCustomOutput]=useState([])  //The output obtained for the custom input that is typed by the user
    const [customInput,setCustomInput]=useState([])    //The custom input that is typed by the user
    const [pending,setPending]=useState(false)         //Piston API takes time to evaluate the custom input


    const [run,setRun]=useState(false)   //Checks whether run button is clicked or not
    const [custom,setCustom]=useState('')  //Checks whether custom input section is opened or not
    const [lines,setLines]=useState(3)    // Extract the total lines from the custom input section

    const [compileError,setCompileError]=useState('') // Holds the state of the compilation error
    const [infLoopError,setInfLoopError]=useState(false) //Handles infinite loop conditions

    const [correctOutput,setCorrectOutput]=useState([])
    const [accepted,setAccepted]=useState(true)

     
    const [language,setLanguage]=useState({'value':'cpp','label':'C++'}) //default set for the language

    //Initial Starter Code for the problem
    const [initialCode,setInitialCode]=useState('')
    //Main Function for the Code which will be COncatenated with the user written code
    const [mainFunction,setMainFunction]=useState('')

    //Fetching the BoilerPlate Code form Database
    const fetchBoilerPlateCode = async()=>{
      try{
        
      }
      catch(error){
        console.log(error)
      }
    }

    const currentVersion=`${(language?.label==='C++' || language?.label==='C')?
    '10.2.0':'3.10.0'}`

   let pistonFormat={        // Format for the piston API body
      "language": language?.value,
       "files": [
     {
      "name": `main.${language?.value}`,
      "content": code,
      "compile_timeout": 10000,
      "run_timeout": 3000,
    }
  ],
  "stdin": "5\n1 2 3 4 5\n9",
  "version": currentVersion
    }
    

    const runCodeHandler=async()=>{
        setInfLoopError(false)  //setting infinite loop error to false when the piston API is run
        setCompileError('')  //setting compilation error to null when the piston API is run
        setCustomInput([])  //setting the custom input to empty when the run button is clicked
        setCustomOutput([])  //setting the custom output to empty when the run button is clicked
        setRun(true)        // This function is run when run button is clicked
        setPending(true)    // This indicates that piston API needs some time to evalutate the result
        setTestActive(prev=>{         // This enables us to switch to the result section when this function runs
          let updateActive={...prev}
          updateActive.result=true
          updateActive.testcase=false
          return updateActive
        })
        if(raw===true)
        {
            const testcases=custom.split('\n')[0]
            const testcaseArray=custom.split('\n')
            const totalLines=testcaseArray.length-1;
            const lines=totalLines/testcases
            for(let i=0;i<testcases;i++)
            {
               let custInput="";
              for(let j=0;j<lines;j++)
              {
                 custInput+=testcaseArray[i*lines+j+1]+'\n';
              }
              setCustomInput(prev=>[...prev,custInput])
            }
            pistonFormat.stdin=custom // setting the piston API stdin input attribute
        }
        else
        {
           pistonFormat.stdin=problem.givenTestCases
        }

        //  console.log(pistonFormat.stdin)
            const {data}=await axios.post('https://emkc.org/api/v2/piston/execute',pistonFormat)
           if(data.run?.signal==='SIGKILL')
           setInfLoopError(true)
           else if(raw===true && !data.compile?.stderr && !data.run?.stderr)
           setCustomOutput(data.run.output.split('\n')) // setting the custom output to map over in the result section
           else if(language.value!=='py')
           setCompileError(data.compile?.stderr)
           else if(language.value==='py')
           setCompileError(data.run?.stderr)
           console.log(data)
          //  console.log(customOutput)
          // console.log(data.run.output)
           if(raw===false)
           {
               const givenTestCasesActual=problem.givenTestCasesOutput.split('\n')
               const givenTestCasesPredicted=data.run.output.split('\n')
               setCorrectOutput([])
               setAccepted(true)
               for(let i=0;i<givenTestCasesActual.length;i++)
               {
                  if(givenTestCasesActual[i]===givenTestCasesPredicted[i])
                  setCorrectOutput(prev=>[...prev,true])
                  else
                  {
                     setCorrectOutput(prev=>[...prev,false])
                     setAccepted(false)
                  }
                  
               }
               
           }
        setPending(false)
    }
    

  

    const [raw,setRaw]=useState(false) //toggle for custom test cases

    const [testActive,setTestActive]=useState({  //toggling for result and testcases section
      testcase:true,
      result:false
    }) 
    const [problem,setProblem] = useState({})
     const [split,setSplit]=useState(true) // if splitter is false then the test cases section is collapsed

    //Fetch the Problem Details
    const fetchProblem=async()=>{
      try{
        const response = await axios.get(`${baseUrl}/api/problems/single-problem/${params.slug}`)
        setProblem(response.data.problem)
        console.log(response.data.problem)
      }
      catch(error){
        console.log(error)
      }
    }
    //to toggle the test case section to enable right side section for coding
    const handleSplitter=()=>{
        if(split)
        setSplit(false)
        else
        setSplit(true)
    }

    //Fetching the Problem as soon as Page Loads
    useEffect(()=>{
      fetchProblem()
    },[params.slug])

  return (
    <Layout type="ProblemHeader" questionNo={problem.problemNo} 
      language={language} setLanguage={setLanguage}>
    <div className="row">
      <div className="col-6" style={{"paddingRight":"0px"}}>
        <div style={{ marginTop: '0.5rem' }}>
          <ProblemDescHeader active={active} setActive={setActive} />
          {active.description ? <ProblemDesc /> : <Submissions />}
        </div>
      </div>
      <div className="col-6" style={{"paddingLeft":"0px"}}> 
        <div style={{ minHeight: '45%' }}>
          <Code split={split} code={code} setCode={setCode} />
        </div>
        <div style={{ overflowY: 'scroll', height: '38%' }}>
          {split && (
            <div>
              <TestCaseHeader active={testActive} setActive={setTestActive} raw={raw} setRaw={setRaw} />
              {testActive.testcase ? (
                <TestCases raw={raw} testcases={problem.sampleTestCases} custom={custom} setCustom={setCustom} />
              ) : (
                <Result
                  testcases={problem.sampleTestCases}
                  accepted={accepted}
                  correctOutput={correctOutput}
                  raw={raw}
                  run={run}
                  pending={pending}
                  customOutput={customOutput}
                  customInput={customInput}
                  compileError={compileError}
                  infLoopError={infLoopError}
                />
              )}
            </div>
          )}
        </div>
        <div>
          <Footer handleSplitter={handleSplitter} split={split} runCodeHandler={runCodeHandler} pending={pending} />
        </div>
      </div>
    </div>
  </Layout>
  
  )
}

export default ProblemDescription

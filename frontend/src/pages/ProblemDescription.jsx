import Layout from '../components/Layout/Layout';
import React,{useEffect,useState} from 'react'
import Split from 'react-split'
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

   let pistonFormat={        // Format for the piston API body
      "language": "cpp",
       "files": [
     {
      "name": "main.cpp",
      "content": `${code}`
    }
  ],
  "stdin": "5\n1 2 3 4 5\n9",
  "version": "10.2.0"
    }
    

    const runCodeHandler=async()=>{
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
        const totalLines=custom.split('\n').length   // Calculate the total lines from the custom input section
        // console.log(totalLines)
        if(totalLines%lines!==0)
        {
          alert('Wrong set of inputs')
          return;
        }
        const numTestCases=totalLines/lines        //To get the total custom test cases in the custom input section
        const filteredTestcases=custom.split('\n')  // To get an array of the custom input such that each element in array is a line in the textarea
        // console.log(filteredTestcases)
        for(let i=0;i<numTestCases;i++)
        {
           const baseLine=i*lines;          //extract the lines required for a testcase 
           const upperLine=i*lines+lines;
           
           let stdinFormat=''                  //convert the user testcase to stdin format of Piston API 
           for(let j=baseLine;j<upperLine;j++)
           {
              stdinFormat+=filteredTestcases[j]+'\n'
           }
          setCustomInput(prev=>{                   //set custom input to loop over in the result section
          let updateCustom=[...prev,stdinFormat]
          return updateCustom
          })

          pistonFormat.stdin=stdinFormat    // setting the piston API stdin input attribute
          //  console.log(pistonFormat.stdin)
           const {data}=await axios.post('https://emkc.org/api/v2/piston/execute',pistonFormat)
           setCustomOutput(prev=>[...prev,data.run.output]) // setting the custom output to map over in the result section
          //  console.log(customOutput)
          //  console.log(data.run.output)
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
    <Layout type="ProblemHeader" questionNo={problem.problemNo}>
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
                  raw={raw}
                  run={run}
                  pending={pending}
                  customOutput={customOutput}
                  customInput={customInput}
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

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
import { useAuthContext } from '../context/AuthContext';
import './styles/split.css'
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import { useParams } from 'react-router-dom';
import SubmissionCode from '../components/ProblemSections/SubmissionCode';

const ProblemDescription = () => {

  //to obtain Slug from the URL
  const params=useParams()
  const [auth,setAuth]=useAuthContext()
  const [submissionCode,setSubmissionCode]=useState('') //The code that comes up when user clicks a submission
  const [editorCode,setEditorCode]=useState(true)  //Checks whether submission code should be opened up or editor code
 

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
    const [submit,setSubmit]=useState(false) //Checks whether submit button is clicked or not

    const [compileError,setCompileError]=useState('') // Holds the state of the compilation error
    const [infLoopError,setInfLoopError]=useState(false) //Handles infinite loop conditions

    const [correctOutput,setCorrectOutput]=useState([])  //comparing outputs and setting them true or false based on actual and user code outputs
    const [accepted,setAccepted]=useState(true)  // Declared accepted if all the values in correctOutput is true which means that all the outputs are matched with actual outputs for the testcase


    const [passed,setPassed]=useState(0)  //indicates how many hidden test cases passed
    const [success,setSuccess]=useState(true) //indicates whether all test cases passed or not
    const [totalTestCases,setTotalTestCases]=useState(0) //gets a list of all hidden testcases
    

     const [raw,setRaw]=useState(false) //toggle for custom test cases

    const [testActive,setTestActive]=useState({  //toggling for result and testcases section
      testcase:true,
      result:false
    }) 
    const [problem,setProblem] = useState({}) // object that contains the problem fetched from the database
     const [split,setSplit]=useState(true) // if splitter is false then the test cases section is collapsed

     
    const [language,setLanguage]=useState({'value':'cpp','label':'C++'}) //default set for the language

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
        setSubmit(false)
        setPending(true)    // This indicates that piston API needs some time to evalutate the result
        setTestActive(prev=>{         // This enables us to switch to the result section when this function runs
          let updateActive={...prev}
          updateActive.result=true
          updateActive.testcase=false
          return updateActive
        })
        if(raw===true)
        {
            const testcases=custom.split('\n')[0]    //Gets total custom input test cases from the first line
            const testcaseArray=custom.split('\n')   //Convert string with \n to arrays split by \n
            const totalLines=testcaseArray.length-1;  //Get total number of lines that belong to testcases excluding first line that denotes number of testcases
            const lines=totalLines/testcases          //Get number of lines per test case by dividing total lines with total testcases obtained from the first line
            for(let i=0;i<testcases;i++)
            {
               let custInput="";    // build the custom input to be shown in result of custom input
              for(let j=0;j<lines;j++)
              {
                 custInput+=testcaseArray[i*lines+j+1]+'\n';  //build one testcase into one element in the array
              }
              setCustomInput(prev=>[...prev,custInput])  // This contains array of strings with \n characters where each element in the array denotes all lines of the testcase in string format with \n.
            }
            pistonFormat.stdin=custom // setting the piston API stdin input attribute
        }
        else
        {
           pistonFormat.stdin=problem.givenTestCases // setting the given testcases to the piston API
           console.log(problem.givenTestCases)  
        }

        
          //Concatenating the Code with the main function and Header File

          const concatenatedCode = headerFile+code+mainFunction
          pistonFormat.files[0].content=concatenatedCode

           const {data}=await axios.post('https://emkc.org/api/v2/piston/execute',pistonFormat)
           if(data.run?.signal==='SIGKILL')
           setInfLoopError(true)
           else if(raw===true && !data.compile?.stderr && !data.run?.stderr) //this indicates that for custom inputs where there is no runtime or compile time error set the generated output for the custom input.
           setCustomOutput(data.run.output.split('\n')) // setting the custom output to map over in the result section
           else if(language.value!=='py') // Languages except python use compilers hence piston API as this attribute to indicate if there are any compilation errors
           setCompileError(data.compile?.stderr)
           else if(language.value==='py') // Python is interpreter hence compile attribute is missing in piston API output and can be obtained only from run attribute
           setCompileError(data.run?.stderr) 
          //  console.log(data)
          //  console.log(customOutput)
          // console.log(data.run.output)
           if(raw===false)  // given test cases comparison of output should also be done
           {
               const givenTestCasesActual=problem.givenTestCasesOutput.split('\n') // actual output for the given testcases that is fetched from database
               const givenTestCasesPredicted=data.run.output.split('\n')  //generated output
               console.log(givenTestCasesPredicted)
               setCorrectOutput([]) //Initially previous outputs are cleared
               setAccepted(true)  // Indicates that if one test case is failed accepted becomes false later on
               for(let i=0;i<givenTestCasesActual.length;i++)
               {
                  if(givenTestCasesActual[i]===givenTestCasesPredicted[i])
                  setCorrectOutput(prev=>[...prev,true]) //pushing the value of the comparison of both the outputs
                  else
                  { 
                     setCorrectOutput(prev=>[...prev,false]) //pushing the value of the comparison of both the outputs
                     setAccepted(false)  // If one test case is failed code is not accepted
                  }
                  
               }
               
           }
        setPending(false) //setting the pending to false once execution is done
        setSplit(true) // This is used to bring the testcase section up even if run button is clicked even though test case section is not open
    }

    const submitButtonHandler=async()=>{
         setInfLoopError(false)  //setting infinite loop error to false when the piston API is run
        setCompileError('')  //setting compilation error to null when the piston API is run
        setCustomInput([])  //setting the custom input to empty when the run button is clicked
        setCustomOutput([])  //setting the custom output to empty when the run button is clicked
        setSubmit(true)        // This function is run when run button is clicked
        setPending(true)    // This indicates that piston API needs some time to evalutate the result
        setSuccess(true) // This indicates all the hidden test cases passed
        setRun(false) // This is done to switch of the effects of run button in result section when submit button is clicked
        setPassed(0)  // This number tells us how many hidden test cases have passed
        
        pistonFormat.stdin=problem.hiddenTestCases
        const concatenatedCode = headerFile+code+mainFunction
        pistonFormat.files[0].content=concatenatedCode
        const {data}=await axios.post('https://emkc.org/api/v2/piston/execute',pistonFormat)

          if(data.run?.signal==='SIGKILL')
          {
            setTestActive(prev=>{         // This enables us to switch to the result section when this function runs
            let updateActive={...prev}
            updateActive.result=true
            updateActive.testcase=false
            return updateActive
            })
            setSplit(true)        //popping up the result section even if submit button is clicked without test case section being opened
            setInfLoopError(true)
            await axios.post(`${baseUrl}/api/submissions/create-submission`,{
              problemId:problem._id,
              userId:auth.user.userId,
              status:'Runtime Error',
              language:language.label,
              user_code:code,
              passed:'',
              hidden_testcases:'',
              errors:'Infinite Loop Error',
            })
          }


           else if(language.value!=='py' && data.compile.stderr)
           {
              setTestActive(prev=>{         // This enables us to switch to the result section when this function runs
            let updateActive={...prev}
            updateActive.result=true
            updateActive.testcase=false
            return updateActive
            })
            setSplit(true)
            setCompileError(data.compile?.stderr)
            await axios.post(`${baseUrl}/api/submissions/create-submission`,{
              problemId:problem._id,
              userId:auth.user.userId,
              status:'Compile Error',
              language:language.label,
              user_code:code,
              passed:'',
              hidden_testcases:'',
              errors:data.compile.stderr,
            })

           }
           
           else if(language.value==='py' && data.run.stderr)
           {
               setTestActive(prev=>{         // This enables us to switch to the result section when this function runs
              let updateActive={...prev}
              updateActive.result=true
              updateActive.testcase=false
              return updateActive
              })
              setSplit(true)
               setCompileError(data.run?.stderr)

               await axios.post(`${baseUrl}/api/submissions/create-submission`,{
              problemId:problem._id,
              userId:auth.user.userId,
              status:'Compile Error',
              language:language.label,
              user_code:code,
              passed:'',
              hidden_testcases:'',
              errors:data.run.stderr,
            })

           }
           
           else
           {
               const hiddenTestCasesActual=problem.hiddenTestCasesOutput.split('\n')
               const hiddenTestCasesPredicted=data.run.output.split('\n')
               const totalTestcases=problem.hiddenTestCases.split('\n')[0]
               setTotalTestCases(totalTestcases)
              //  console.log(hiddenTestCasesActual)
              //  console.log(hiddenTestCasesPredicted)
              //  console.log(totalTestcases)
               
               for(let i=0;i<hiddenTestCasesActual.length;i++)
               {
                  if(hiddenTestCasesActual[i]===hiddenTestCasesPredicted[i])
                  setPassed(prev=>prev+1)    
                   else
                   setSuccess(false)
               }
               if(Number(passed)===Number(totalTestCases))  // Better to do comparisons by converting both to numbers because extraction of numbers from strings converts them to numbers
               {
                  setActive(prev=>{
                  const updateActive={...prev}
                  updateActive.description=false
                  updateActive.submissions=true
                  return updateActive
                  })
                  setSplit(false)
                  await axios.post(`${baseUrl}/api/submissions/create-submission`,{
                  problemId:problem._id,
                  userId:auth.user.userId,
                  status:'Accepted',
                  language:language.label,
                  user_code:code,
                  passed:'',
                  hidden_testcases:'',
                  errors:'',
                  })
               }
               else
               {
                  setTestActive(prev=>{         // This enables us to switch to the result section when this function runs
                  let updateActive={...prev}
                  updateActive.result=true
                  updateActive.testcase=false
                  return updateActive
                  })
                  setSplit(true)
                  await axios.post(`${baseUrl}/api/submissions/create-submission`,{
                  problemId:problem._id,
                  userId:auth.user.userId,
                  status:'Wrong Answer',
                  language:language.label,
                  user_code:code,
                  passed:passed,
                  hidden_testcases:totalTestCases,
                  errors:'',
                  })
               }

             
          }
          setPending(false)



    }

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

    //Initial BoilerPlate Code for The problem for Each Language
    const [boilerPlate,setBoilerPlate] = useState('')
    //Main Function for the Code which will be COncatenated with the user written code
    const [mainFunction,setMainFunction]=useState('')
    //Header File Code if exists
    const [headerFile,setHeaderFile]=useState('')

    //Fetching the BoilerPlate Code form Database
    const fetchBoilerPlateCode = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/boilerPlate/get-singleProblemCode/${problem._id}`);
        setBoilerPlate(data?.boilerPlateCode);
    
        if (boilerPlate) {
          const desiredCode = boilerPlate.boilerPlate.find(obj => obj.language === 'cpp');
    
          if (desiredCode) {
            setCode(desiredCode.initialCode);
            setMainFunction(desiredCode.mainFunction);
            setHeaderFile(desiredCode?.headerFilesCode)
          } else {
            // Handle the case where desired code is not found
            console.log('Desired code not found for language "cpp"');
          }
        } else {
          // Handle the case where boilerPlate is not defined
          console.log('BoilerPlate is not defined');
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    useEffect(()=>{
      fetchBoilerPlateCode()
    },[problem])

    useEffect(()=>{
      const desiredCode = boilerPlate?.boilerPlate?.find(obj => obj.language === language?.value);
      setMainFunction(desiredCode?.mainFunction)
      setCode(desiredCode?.initialCode)
      setHeaderFile(desiredCode?.headerFilesCode)
    },[language.value,boilerPlate?.boilerPlate])

  return (
    <Layout type="ProblemHeader" questionNo={problem.problemNo} 
      language={language} setLanguage={setLanguage}>
    <div className="row">
      <div className="col-6" style={{"paddingRight":"0px"}}>
        <div style={{ marginTop: '0.5rem' }}>
          <ProblemDescHeader active={active} setActive={setActive}
           setEditorCode={setEditorCode} setSplit={setSplit}/>
          {active.description ? <ProblemDesc /> : <Submissions slug={params.slug} email={auth.user.email}
          submissionCode={submissionCode} setSubmissionCode={setSubmissionCode} 
          editorCode={editorCode} setEditorCode={setEditorCode} setSplit={setSplit}/>}
        </div>
      </div>
      <div className="col-6" style={{"paddingLeft":"0px"}}> 
        <div style={{ minHeight: '45%' }}>
          {editorCode?<Code split={split} code={code} setCode={setCode} />:
          <SubmissionCode submissionCode={submissionCode} split={split}/>}
        </div>
        <div style={{ overflowY: 'scroll', maxHeight: '38%' }}>
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
                  submit={submit}
                  passed={passed}
                  success={success}
                  totalTestCases={totalTestCases}
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
          <Footer handleSplitter={handleSplitter} split={split} 
          runCodeHandler={runCodeHandler} submitButtonHandler={submitButtonHandler} pending={pending} 
          run={run} submit={submit}/>
        </div>
      </div>
    </div>
  </Layout>
  
  )
}

export default ProblemDescription
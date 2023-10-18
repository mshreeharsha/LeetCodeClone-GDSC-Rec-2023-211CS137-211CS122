import Layout from '../components/Layout/Layout';
import React,{useEffect,useState} from 'react'
import Split from 'react-split'
import Footer from '../components/ProblemSections/Footer'
import ProblemDesc from '../components/ProblemSections/ProblemDesc';
import Code from '../components/ProblemSections/Code';
import TestCases from '../components/ProblemSections/TestCases'
import ProblemDescHeader from '../components/Layout/ProblemDescHeader';
import Submissions from '../components/ProblemSections/Submissions';
import './styles/split.css'
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import { useParams } from 'react-router-dom';
const ProblemDescription = () => {

  //to obtain Slug from the URL
  const params=useParams()

   const [active,setActive]=useState({
        description:true,
        submissions:false
    })
    const [problem,setProblem] = useState({})

    const [split,setSplit]=useState(true) // if splitter is false then the test cases section is collapsed

    const handleSplitter=()=>{
        if(split)
        setSplit(false)
        else
        setSplit(true)
    }

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

    //Fetching the Problem as soon as Page Loads
    useEffect(()=>{
      fetchProblem()
    },[params.slug])

  return (
  <Layout type="ProblemHeader" questionNo={problem.problemNo}>
    
    <Split className='split' direction='horizontal' sizes={[40, 60]} 
    gutterSize={15} minSize={300} >
       <div style={{'margin-top':'0.5rem'}}>
       <ProblemDescHeader active={active} setActive={setActive}/>
       {active.description?<ProblemDesc problem={problem}/>:<Submissions problem={problem}/>} 
       
       </div>
       {split?(
         <Split className='w-[calc(100vw-94px)]' direction='vertical'
       gutterSize={15} sizes={[60, 40]} minSize={60}
       style={{ maxHeight: '90vh','width':'100%' }}>
          <div style={{'min-height':'20rem'}}>
            Hello
          </div>
          <div style={{'overflow-y':'auto'}}>
            <div>
              Hello This is where i am testing this unit. Common this is good</div>
            <Footer handleSplitter={handleSplitter} split={split}/>
          </div>
       </Split>
       ):<Split
       className='w-[calc(100vw-94px)]' direction='vertical'
       gutterSize={15} sizes={[100, 0]}
       style={{ maxHeight: '100vh','width':'100%' }}>
        <div style={{'min-height':'20rem'}}>
            Hello
          </div>
          <div>
        <Footer handleSplitter={handleSplitter} split={split}/>
        </div>
        </Split>}        
    </Split>
  </Layout>
  )
}

export default ProblemDescription

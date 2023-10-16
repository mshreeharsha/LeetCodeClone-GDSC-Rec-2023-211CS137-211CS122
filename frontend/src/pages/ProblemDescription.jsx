import Layout from '../components/Layout/Layout';
import React,{useEffect,useState} from 'react'
import Split from 'react-split'
import Footer from '../components/ProblemSections/Footer'
import './styles/split.css'
const ProblemDescription = () => {

  return (
  <Layout type="ProblemHeader">
    <Split className='split-1' direction='horizontal' sizes={[40, 60]} gutterSize={15}>
       <div>
       Panel1
       </div>
        <Split className='w-[calc(100vw-94px)]' direction='vertical' 
       gutterSize={15} sizes={[60, 40]} minSize={60}
       style={{ maxHeight: '90vh' }}>
          <div style={{'min-height':'20rem'}}>
            Hello
          </div>
          <div style={{'overflow':'auto'}}>
            <div >
              Hello This is where i am testing this unit. Common this is good</div>
            <Footer/>
          </div>
          
       </Split>
       
       
        
    </Split>
  </Layout>
  )
}

export default ProblemDescription

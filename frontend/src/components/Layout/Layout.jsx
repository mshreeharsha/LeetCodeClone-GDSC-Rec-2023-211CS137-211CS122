import React from 'react';
import Header from "./Header.jsx";
import ProblemHeader from './ProblemHeader.jsx';
const Layout = ({children,type,questionNo}) => {
  return (
    <div style={{'maxHeight':'100vh','overflow':'hidden'}}>
      {type=='mainHeading'?<Header />:type=='ProblemHeader'?<ProblemHeader questionNo={questionNo}/>:''}
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout
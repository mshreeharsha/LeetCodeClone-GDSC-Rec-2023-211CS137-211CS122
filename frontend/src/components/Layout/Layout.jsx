import React from 'react';
import Header from "./Header.jsx";
import ProblemHeader from './ProblemHeader.jsx';
const Layout = ({children,type,questionNo}) => {
  return (
    <div>
      {type=='mainHeading'?<Header />:type=='ProblemHeader'?<ProblemHeader questionNo={questionNo}/>:''}
      <main style ={{minHeight:"70vH"}}>
        {children}
      </main>
    </div>
  )
}

export default Layout
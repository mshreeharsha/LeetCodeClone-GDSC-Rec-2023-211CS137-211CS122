import React from 'react';
import Header from "./Header.jsx";
import ProblemHeader from './ProblemHeader.jsx';
const Layout = ({children,type}) => {
  return (
    <div>
      {type=='mainHeading'?<Header />:type=='ProblemHeader'?<ProblemHeader/>:''}
      <main style ={{minHeight:"70vH"}}>
        {children}
      </main>
    </div>
  )
}

export default Layout
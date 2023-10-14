import React from 'react';
import Header from "./Header.jsx";

const Layout = ({children}) => {
  return (
    <div>
      <Header />
      <main style ={{minHeight:"70vH"}}>
        {children}
      </main>
    </div>
  )
}

export default Layout
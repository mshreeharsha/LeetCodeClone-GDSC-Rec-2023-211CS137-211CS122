import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext()

const AuthContextProvider =({children})=>{
  const [auth,setAuth] = useState({
    user:null,
    token:''
  })

  //Setting Default Header in Axios
  axios.defaults.headers.common["Authorization"]=auth?.token
  
  useEffect(()=>{
    //Fetching the Token from Local Storage

    const data = localStorage.getItem('auth')

    if(data){
      const parseData=JSON.parse(data)
      setAuth(
        {
          ...auth,
          user:parseData.user,
          token:parseData.token
        }
      )
    }
    //esline-disable-next-line
  },[])

  return(
    <AuthContext.Provider value={[auth,setAuth]}>
      {children}
    </AuthContext.Provider>
  )
}

//Creating a custom Hook

const useAuthContext = ()=>{
  return useContext(AuthContext)
}

export {useAuthContext,AuthContextProvider}
import React, { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate, useLocation } from "react-router-dom";

const Login = ({setOpen}) => {
  const navigate = useNavigate()
  const location = useLocation();
  const [auth,setAuth] = useAuthContext()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  //Form Submit Handling
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:5000/api/user/login",{
        email,
        password
      })

      if(response.data.success){
        console.log(response)
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token
        })
        

        //Saving the Token and user into Local Storage

        localStorage.setItem("auth",JSON.stringify(response.data))

        //Navigating back to the place from where the login was called
        navigate(location.state || "/");

        setOpen(false)
      }
      else{
          alert(response.data.message)
      }
    }
    catch(error){
      console.log("Some error")
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h4>Login</h4>
          <div>
            <label htmlFor='email'>Email ID : </label>
            <input type="email" name="email" id
            value={email} onChange={(e)=>{setEmail(e.target.value)}} required
            placeholder='example@gmail.com' />
          </div>
          <div>
            <label htmlFor='password'>Password : </label>
            <input type='password' id="password" name="password" value={password}
            onChange={(e)=>{setPassword(e.target.value)}} required />
          </div>
          <div>
            <button type='submit'>LOGIN</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

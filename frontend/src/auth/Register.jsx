import {useEffect,useState} from 'react';
import axios from 'axios'
import {baseUrl} from '../baseUrl.js'
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
  const [user,setUser]=useState({
    username:'',
    email:'',
    password:''
  })

  const inputHandler=(e)=>{
      const newUser={...user,[e.target.name]:e.target.value}
      setUser(newUser)
  }
  const submitHandler=async(e)=>{
    try{
      e.preventDefault()
      const {data}=await axios.post(`${baseUrl}/api/user/register`,user)
      if(data.success)
      {
        alert(data.message)
        setUser({
          username:'',
          email:'',
          password:''
        })
        navigate('/login')
      }
      else{
        alert(data.message)
      }
    }
    catch(error)
    {
        alert('Something did go wrong')
    }
  }
  return (
    <>
    <form onSubmit={(e)=>submitHandler(e)}>
      <div className="form-control">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username"
         value={user.username} placeholder="Enter username"
         onChange={(e)=>inputHandler(e)} />
      </div>

      <div className="form-control">
         <label htmlFor="email">Email</label>
         <input type="email" name="email" id="email" 
         value={user.email} placeholder="Enter email"
         onChange={(e)=>inputHandler(e)}/>
      </div>

      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password"
         value={user.password} placeholder="Enter password"
         onChange={(e)=>inputHandler(e)}/>
      </div>

       <button type="submit">Submit</button>

    </form>
    </>
  );
}

export default Register;

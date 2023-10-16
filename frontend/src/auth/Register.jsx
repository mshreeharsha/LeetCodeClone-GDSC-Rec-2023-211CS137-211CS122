import {useEffect,useState} from 'react';
import axios from 'axios'
import {baseUrl} from '../baseUrl.js'
import { useNavigate } from "react-router-dom";

const Register = ({setOpen}) => {
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
        setOpen(false)
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
    <div className='container text-center' backgroundColor='#FFF0F5'><h4>Register</h4></div>
      <div className="form-control row mb-3">
        <label htmlFor="username" className="col-sm-3 col-form-label" style={{ fontWeight: 'bold' }}>Username</label>
        <input type="text" name="username" id="username"
         value={user.username} placeholder="Enter username"
         onChange={(e)=>inputHandler(e)} className="form-control" style={{ backgroundColor: '#f7f7f7' }}  />
      </div>

      <div className="form-control row mb-3">
         <label htmlFor="email" className="col-sm-3 col-form-label" style={{ fontWeight: 'bold' }}>Email</label>
         <input type="email" name="email" id="email" 
         value={user.email} placeholder="Enter email"
         onChange={(e)=>inputHandler(e)} className="form-control" style={{ backgroundColor: '#f7f7f7' }} />
      </div>

      <div className="form-control row mb-3">
        <label htmlFor="password" className="col-sm-3 col-form-label" style={{ fontWeight: 'bold' }}>Password</label>
        <input type="password" name="password" id="password"
         value={user.password} placeholder="Enter password"
         onChange={(e)=>inputHandler(e)} className="form-control" style={{ backgroundColor: '#f7f7f7' }} />
      </div>

       <button type="submit" className="btn btn-outline-warning">Submit</button>

    </form>
    </>
  );
}

export default Register;

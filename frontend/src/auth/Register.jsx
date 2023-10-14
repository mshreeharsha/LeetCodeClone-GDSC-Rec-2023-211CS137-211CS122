import {useEffect,useState} from 'react';

const Register = () => {
  const [user,setUser]=useState({
    username:'',
    email:'',
    password:''
  })

  const inputHandler=(event)=>{

  }
  return (
    <>
    <form onSubmit={submitHandler}>
    <div class="form-control">
      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" value={user.username} placeholder="Enter username" />
    </div>

    <div>

    </div>

    <div>

    </div>
    
    </form>
    </>
  );
}

export default Register;

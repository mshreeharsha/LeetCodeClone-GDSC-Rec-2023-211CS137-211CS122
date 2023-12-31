import React,{useState} from 'react'
import { NavLink,Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import AuthModal from '../Modal/authModal'

const Header = () => {
  const [auth,setAuth]=useAuthContext()
  const [type,setType]=useState('')
  const [open,setOpen]=useState(false)

  //handelling Logout Action
  //auth may contain other items other than user and token
  const handleLogout = ()=>{
    setAuth({
      ...auth,
      user:null,
      token:""
    })

    localStorage.removeItem('auth')
  }

  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link to='/' className="navbar-brand" href="#">LeetCode
                    </Link>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">    
                            <NavLink to='/' className="nav-link" aria-current="page" href="#">Home</NavLink>
                        </li> */}
                        
                        {!auth.user?(<><li className="nav-item">
                            <button onClick={()=>{setType('register');setOpen(true)}} class="btn btn-warning" style={{"color":"white"}}>SignUp</button>
                        {/* <NavLink to='/register' className="nav-link" href="#">SignUp</NavLink> */}
                        </li>
                        <li className="nav-item">
                            <button onClick={()=>{setType('login');setOpen(true)}} class="btn btn-warning" style={{"color":"white","marginLeft":"3px"}}>Login</button>
                        {/* <NavLink to='/login' className="nav-link" href="#">Login</NavLink> */}
                        </li></>):(<>
                        <li className="nav-item">
                            <NavLink href="#" className="nav-link">
                                {auth?.user?.username}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <button onClick={handleLogout} class="btn btn-warning" style={{"color":"white"}}>Logout</button>
                            {/* <NavLink className="nav-link" onClick={handleLogout} to='/login' href="#">Logout</NavLink> */}
                        </li>
                        </>)}
                    </ul>
                </div>
            </div>
        </nav>
        <AuthModal type={type} open={open} setOpen={setOpen} setType={setType}/>
    </>
  )
}

export default Header
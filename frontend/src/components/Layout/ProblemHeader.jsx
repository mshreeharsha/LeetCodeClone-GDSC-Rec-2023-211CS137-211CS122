import React,{useState,useEffect} from 'react'
import { NavLink,Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import AuthModal from '../Modal/authModal'
import Timer from '../Timer'
import { FaBars } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft,faChevronRight } from '@fortawesome/free-solid-svg-icons';


const ProblemHeader = () => {
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
                    <Link to='/' className="navbar-brand" href="#">
                        LeetCode
                    </Link>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 flex align-items">
                        <li className='nav-item' style={{'margin-right':'1rem'}}><FontAwesomeIcon icon={faChevronLeft} size="2x" /></li>
                        <li className='nav-item'><FaBars size={32}/></li>
                        <h3 style={{'margin-left':'1rem'}}>Problem List</h3>
                        <li className='nav-item' style={{'margin-left':'1rem'}}><FontAwesomeIcon icon={faChevronRight} size="2x" /></li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                            <NavLink to='/' className="nav-link" aria-current="page" href="#">Home</NavLink>
                        </li> */}
                        <li className='nav-item mr-5'><Timer/></li>
                        {!auth.user?(<><li className="nav-item">
                            <button onClick={()=>{setType('register');setOpen(true)}}>SignUp</button>
                        {/* <NavLink to='/register' className="nav-link" href="#">SignUp</NavLink> */}
                        </li>
                        <li className="nav-item">
                            <button onClick={()=>{setType('login');setOpen(true)}}>Login</button>
                        {/* <NavLink to='/login' className="nav-link" href="#">Login</NavLink> */}
                        </li></>):(<>
                        <li className="nav-item">
                            <NavLink href="#" className="nav-link">
                                {auth?.user?.username}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <button onClick={handleLogout}>Logout</button>
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

export default ProblemHeader
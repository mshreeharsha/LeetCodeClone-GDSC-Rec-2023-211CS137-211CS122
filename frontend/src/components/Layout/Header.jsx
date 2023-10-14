import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'


const Header = () => {
  const [auth,setAuth]=useAuthContext()

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
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link" aria-current="page" href="#">Home</NavLink>
                        </li>
                        
                        {!auth.user?(<><li className="nav-item">
                        <NavLink to='/register' className="nav-link" href="#">SignUp</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink to='/login' className="nav-link" href="#">Login</NavLink>
                        </li></>):(<>
                        <li className="nav-item">
                            <NavLink href="#" className="nav-link">
                                {auth?.user?.username}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" onClick={handleLogout} to='/login' href="#">Logout</NavLink>
                        </li>
                        </>)}
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Header
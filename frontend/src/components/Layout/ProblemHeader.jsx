import React,{useState,useEffect} from 'react'
import { NavLink,Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import AuthModal from '../Modal/authModal'
import Timer from '../Timer'
import { FaBars } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft,faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { baseUrl } from '../../baseUrl'
import LanguageHeader from './LanguageHeader'

const ProblemHeader = ({questionNo,language,setLanguage}) => {
  const navigate=useNavigate()
  const [auth,setAuth]=useAuthContext()
  const [type,setType]=useState('')
  const [open,setOpen]=useState(false)
  const [totalProb,setTotalProb]=useState(0)
  const [nextSlug,setNextSlug] = useState('')
  
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

  //Fetching the Total No of Problems
  const totalProblems=async()=>{
    try{
        const response=await axios.get(`${baseUrl}/api/problems/total-problems`)
        setTotalProb(response?.data.total)
    }
    catch(error){
        console.log(error)
    }
  }

  //Fetching the Total No of Problems at the beginning itself
  useEffect(()=>{
    totalProblems()
  },[])

  //Handling the Request for next / prev Question
  const handleClick = async(req)=>{
    console.log("clicked",req)
    try{
        if(req==='prev'){
            if(Number(questionNo)>1){
                const response = await axios.get(`${baseUrl}/api/problems/next-problem/${Number(questionNo)-1}`)
                navigate(`/problems/${response.data.slug}`)
            }
            else if(Number(questionNo)===1){
                const response = await axios.get(`${baseUrl}/api/problems/next-problem/${totalProb}`)
                navigate(`/problems/${response.data.slug}`)
            }
        }
        else{
            if(Number(questionNo)<Number(totalProb)){
                const response = await axios.get(`${baseUrl}/api/problems/next-problem/${Number(questionNo)+1}`)
                navigate(`/problems/${response.data.slug}`)
            }
            else if(Number(questionNo)===Number(totalProb)){
                const response = await axios.get(`${baseUrl}/api/problems/next-problem/${1}`)
                navigate(`/problems/${response.data.slug}`)
            }
        }
    }
    catch(error){
        console.log(error.message)
    }
  }

  return (
    <>
        <nav className="navbar navbar-expand-sm bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link to='/' className="navbar-brand" href="#">
                        LeetCode
                    </Link>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 flex align-items">
                        <button className='nav-item' style={{'marginRight':'1rem'}} onClick={()=>{handleClick('prev')}} ><FontAwesomeIcon icon={faChevronLeft} size="1x" /></button>
                        <li className='nav-item'><FaBars size={16}/></li>
                        <h5 style={{'marginLeft':'1rem'}}>Problem List</h5>
                        <button className='nav-item' style={{'marginLeft':'1rem'}} onClick={()=>{handleClick('next')}}><FontAwesomeIcon icon={faChevronRight} size="1x" /></button>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                            <NavLink to='/' className="nav-link" aria-current="page" href="#">Home</NavLink>
                        </li> */}
                        
                        <li className='nav-item mr-5'><LanguageHeader language={language} 
                        setLanguage={setLanguage}/></li>
                        <li className='nav-item mr-5'><Timer/></li>
                        {!auth.user?(<><li className="nav-item">
                            <button onClick={()=>{setType('register');setOpen(true)}} className="btn btn-warning" style={{"color":"white"}}>SignUp</button>
                        {/* <NavLink to='/register' className="nav-link" href="#">SignUp</NavLink> */}
                        </li>
                        <li className="nav-item">
                            <button onClick={()=>{setType('login');setOpen(true)}} className="btn btn-warning" style={{"color":"white","marginLeft":"3px"}}>Login</button>
                        {/* <NavLink to='/login' className="nav-link" href="#">Login</NavLink> */}
                        </li></>):(<>
                        <li className="nav-item">
                            <NavLink href="#" className="nav-link">
                                {auth?.user?.username}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <button onClick={handleLogout} className="btn btn-warning" style={{"color":"white","marginLeft":"3px"}}>Logout</button>
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
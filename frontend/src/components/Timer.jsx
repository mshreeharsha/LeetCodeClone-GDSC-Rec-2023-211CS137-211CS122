import React,{useState,useEffect} from 'react';
import { useAuthContext } from '../context/AuthContext';
import {FaClock,FaRefresh} from 'react-icons/fa'
import {FiRefreshCcw} from 'react-icons/fi'

const Timer = () => {
  const [auth,setAuth]=useAuthContext()
  const [timer,setTimer]=useState(false)  // Checks whether timer icon is clicked or not. 
  const [time,setTime]=useState(0)  //Time since the timer icon was clicked so that user can get set up the time he took to solve the problem

  const formatTime=()=>{
      const hours=Math.floor(time/3600)  
      const minutes=Math.floor((time%3600)/60)
      const seconds=time%60

      return `${hours<10?'0'+hours:hours}:  
      ${minutes<10?'0'+minutes:minutes}:
      ${seconds<10?'0'+seconds:seconds}`    //00:00:00 (hours:minutes:seconds)
  }


  useEffect(()=>{
    if(timer)  //interval of 1s is set only if timer icon is clicked
    {
       const interval=setInterval(()=>{
        setTime(time=>time+1)
     },1000) 
     return ()=>clearInterval(interval)
    }
  },[timer])


  return (
    <>
       {(auth.user && !timer)?(
        <li><FaClock size={24} onClick={()=>setTimer(true)} style={{'cursor':'pointer'}}/></li>
       ):(auth.user && timer)?(
        <li>{formatTime()} <FiRefreshCcw onClick={()=>{setTimer(false);setTime(0)}} style={{'cursor':'pointer'}}/></li>
        ):''}
    </>
  );
}

export default Timer;

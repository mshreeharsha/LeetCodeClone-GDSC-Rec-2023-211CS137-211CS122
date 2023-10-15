import React,{useState} from 'react';
import Modal from 'antd/es/modal/Modal';
import Register from '../../auth/Register'
import Login from '../../auth/Login'
const AuthModal = ({type,open,setOpen,setType}) => {

  return (
     <>
     <div>
      {!type?'':type=='register'?
      <Modal onCancel={()=>{setOpen(false);setType('')}} visible={open} footer={null}>
             <Register setOpen={setOpen}/>
       </Modal>:
       <Modal onCancel={()=>{setOpen(false);setType('')}} visible={open} footer={null}>
             <Login setOpen={setOpen}/>
       </Modal>}
       
      </div> 
     </>
  );
}

export default AuthModal;

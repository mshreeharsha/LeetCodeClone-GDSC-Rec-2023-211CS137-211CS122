import React,{useState} from 'react';
import Modal from 'antd/es/modal/Modal';
import Register from '../../auth/Register'
import Login from '../../auth/Login'
const AuthModal = () => {
  const [open,setOpen]=useState(false)
  return (
     <>
     <div>
       {/* <Modal onCancel={setOpen(false)} visible={open} footer={null}> */}
             <Register/>
       {/* </Modal> */}
      </div> 
     </>
  );
}

export default AuthModal;

import React from 'react'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const ToastMessage = ({message,show,setShow}) => {
  return (
    < ToastContainer position={"bottom-center"}>
    <Toast          bg={"dark"}
 onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Body       className={ 'text-white'}
>{message} </Toast.Body>
        </Toast>
  </ToastContainer>

  )
}

export default ToastMessage
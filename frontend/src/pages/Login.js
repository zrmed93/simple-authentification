import React ,{ useState } from 'react'
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import ToastMessage from '../components/Toast';
import { Link } from "react-router-dom";




const Login = () => {
    const [email, setemail] = useState("");  
    const [password, setpassword] = useState("");  
    const [show, setShow] = useState(false);
    const [message, setmessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
       setShow(true)

        event.preventDefault();
        event.stopPropagation();
        axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {email,password})
        .then((res) => {
            if(res.data.accessToken){
              localStorage.setItem('token', res.data.accessToken);
                setmessage('sucseeful login')
          window.location = "/"
            }
            else{
                setmessage(res.data.message)
            }
      }).catch((error) => {
        console.log(error);
        setmessage(error.response.data.message)
      });
      ;}

  return (
    <>
    <h1 className="">LOGIN</h1>


    <div className='d-flex justify-content-center align-items-center border rounded bg-gradient bg-dark-subtle p-4 flex-column shadow'>
    <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  placeholder="name@example.com"

     value={email} onChange={(e)=>setemail(e.target.value)}
     required
     />
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input required type="password" class="form-control" id="exampleInputPassword1"
     value={password} onChange={(e)=>setpassword(e.target.value)}/>
  </div>
  
  <button type="submit" class="btn btn-primary">LOGIN</button>
</form>
<p class="mt-4">You are a new user ? <Link  to="/register" className=" ">Create an account</Link></p>
<ToastMessage message={message} show={show} setShow={setShow}></ToastMessage>

    </div>
  </>
  )
}

export default Login
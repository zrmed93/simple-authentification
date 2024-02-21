import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

const Home = () => {
    const [user, setUser] = useState();  
    const navigate = useNavigate();
    useEffect( () =>{
        async function fetchData() {
            try{
                    const token = localStorage.getItem('token');
                    const res= await axios.get(`${process.env.REACT_APP_API_URL}/users/profile`,{
                        headers: { 'Authorization': `Bearer ${token}` }
                      })
                      if (res.data) {
                       setUser(res.data);
                      }
                }
                catch(e){
                    if (e.response.status === 401) {
                     //   navigate("/login")
                     localStorage.removeItem('token')
                    }
                    console.log(e)
                }
            }
            fetchData()
         
       },[]) 
   

  return (
    <>
    <h1 className="">HOME</h1>
    <div className='d-flex justify-content-center align-items-center border rounded bg-gradient bg-dark-subtle p-4 flex-column shadow'>
        <div className='d-flex mb-3 flex-column'>
<div className=''> username : {user?.username? user.username:" no username entered"} </div>
<div className=''> email : {user?.email} </div>
<div className=''> role : {user?.role} </div>
</div>


<button onClick={()=>  {localStorage.removeItem('token');            window.location = "/"       
}} >LOGOUT</button>

        
    </div>
    </>
  )
}

export default Home
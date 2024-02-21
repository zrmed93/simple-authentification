import React ,{ useState } from 'react'
import Form from 'react-bootstrap/Form';
import {Button,Container} from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import ToastMessage from '../components/Toast';

const Register = () => {
    const [show, setShow] = useState(false);
    const [formValues, setformValues] = useState({username: "", password:"", email:"",role: "user"});  
    const navigate = useNavigate();
    const [message, setmessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setShow(true)
        !formValues.username && delete formValues.username
       axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, formValues)
       .then((res) => {
        res.data &&  setmessage('successful register')
          // navigate('/login', { replace: true });
          window.location = "/login"

      }).catch((error) => {
        setmessage(error.response.data.message)
        console.log(error);
      });
      ;}
    
  return (
    <>
<h1 className="">
    REGISTER
</h1>
    <div className=' d-flex justify-content-center align-items-center border rounded bg-gradient bg-dark-subtle p-4 shadow'>
        <Container  >
        <Form onSubmit={handleSubmit}>
        <Form.Group md="4" className="my-2" controlId="validationCustomUsername">
          <Form.Label>Username (optional)</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              value= {formValues.username}
              onChange={(event) => setformValues({ ...formValues, username: event.target.value })}
              
              />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" required
                      value= {formValues.email}
                      onChange={(event) => setformValues({ ...formValues, email: event.target.value })}
        
        
        />
      </Form.Group>
      <Form.Label  htmlFor="inputPassword5">Password</Form.Label>
      <Form.Control
        type="password"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
        className="mb-3"
        required
        value= {formValues.password}
        onChange={(event) => setformValues({ ...formValues, password: event.target.value })}

      />
            <Form.Label >Role </Form.Label>

        <Form.Select  className="mb-3" aria-label="Default select example"
        value= {formValues.role}
        onChange={(event) => setformValues({ ...formValues, role: event.target.value })}
        required>
      <option value="user">User</option>
      <option value="admin">Admin</option>
      <option value="superviseur">Superviseur</option>
    </Form.Select>
    <Button  type="submit">Register</Button>

    </Form>
    </Container>
    <ToastMessage message={message} show={show} setShow={setShow}></ToastMessage>

  

    </div>
    </> 
  )
}

export default Register
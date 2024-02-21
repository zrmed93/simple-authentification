import './App.css';
import { BrowserRouter as Router, Route,Routes,Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';


function App() {
  const logged = localStorage.getItem('token');

  return (
    <div className="App vh-100 d-flex justify-content-center align-items-center flex-column">
      <Routes>    
      <Route  path='/register' element={<Register/>} />
      <Route  path='/' element={logged?<Home/>:<Navigate to ="/login" replace={true} />}/>
      <Route  path='/login' element={logged?<Navigate to ="/" replace={true} />:<Login/>} />
      <Route  path='*' element={<Navigate to ="/login" replace={true} />} />

   </Routes>
    
    </div>
  );
}

export default App;

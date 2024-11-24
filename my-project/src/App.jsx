import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login';
import Home from './Home';
import CreateEmployee from './Components/CreateEmployee';
import EmployeeList from './Components/EmployeeList';
import UpdateEmployee from './Components/UpdateEmployee';
import { useAuth } from '../Context/AuthProvider';

function App() {
  const [authUser , setAuthUser] = useAuth();

  return (
   <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} >
        <Route path="/create-employee" element={<CreateEmployee/>} />
        <Route path="/employee-list" element={ authUser ? <EmployeeList/> : <Navigate to={"/"} /> } />
        <Route path="/update-employee/:id" element={<UpdateEmployee/>} />
        <Route path="/login" element={<Login />} />

        </Route>
      </Routes>
    </Router>
<ToastContainer/>
   </>
    
  );
}

export default App;

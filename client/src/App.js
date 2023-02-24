import './App.css';
import {useState} from 'react';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import UserForm from './Components/UserForm';
import Topnav from './Components/Topnav';
import StudentList from './Components/StudentList';
import Display from './Components/Display';
import Login from './Components/Login';
import Register from './Components/Register';
import Footer from './Components/Footer';
import Update from './Components/Update';
import Forgot from './Components/Forgot';
import Reset from './Components/Reset';
import 'bootstrap/dist/css/bootstrap.min.css'
import ProtectedRoutes from './Components/ProtectedRoutes';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  return (
    <div className="App">
      <BrowserRouter>
        <Topnav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          <Routes>

            <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='forgot' element={<Forgot/>}/>
            <Route path='/reset/:token' element={<Reset/>}/>
            <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn}/>}>
              <Route path='/students' element={<UserForm/>}/>
              <Route path='/students/list/students/:id' element={<Display/>}/>
              <Route path={'/students/list/students/:id/edit'} element={<Update/>}/>
              <Route path='/students/list' element={<StudentList/>}/>

            </Route>
          </Routes>
          <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;

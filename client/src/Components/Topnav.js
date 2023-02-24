import React, { useEffect, useState } from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {Container, Nav,Navbar} from 'react-bootstrap'

const Topnav = ({isLoggedIn, setIsLoggedIn}) => {
    const [item, setItem] = useState('');
    const navigate=useNavigate();
  

    const logoutHandler = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');
      setIsLoggedIn('false');
      navigate('/login');
      
      localStorage.setItem('isLoggedIn', false)
      console.log(localStorage.getItem('isLoggedIn', false))
    }

    useEffect(() => {
      setItem(localStorage.getItem('token'));
      console.log(item, 'this is item');
    }, [item, isLoggedIn])


    return (
      


        <Navbar bg="dark" variant={'dark'} expand="lg">
        <Container>
          <Navbar.Brand>React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav d-flex flex-direction-column" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="me-auto">
              <Nav.Link as={NavLink} to={'/students'}>Add student</Nav.Link>
              <Nav.Link as={NavLink} to={'/students/list'}>List of students</Nav.Link>
            </Nav>
            
            <Nav>
              {
                item !== null?
                <div>
                  <button onClick={logoutHandler} className='btn btn-light my-2'>Logout</button>
                </div>
                :
                <div className='mt-3 mb-2'>
                  <NavLink className='btn btn-light mr-3 text-decoration-none text-dark' to={'/login'}>Login</NavLink>
                  <NavLink className='btn btn-light text-decoration-none text-dark' to={'/register'}>Register</NavLink>
                </div>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    )
}

export default Topnav
import React, {useState} from 'react';
import './Css/Login.css';
import {NavLink} from 'react-router-dom';
import {Button,Form, Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({setIsLoggedIn, isLoggedIn}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/auth/login',{
            email,
            password
        },{
            withCredentials:true
        })
        .then((res) =>{ 
            setIsLoggedIn(true);
            console.log(res.data);
            console.log(res.data.token);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('isLoggedIn', true);
            console.log(localStorage.getItem('isLoggedIn', true));
            
            }
        )
        .then(() => {
            navigate('/students/list');
        })
        .catch(err => {
            console.log(err)
            }
        ) 
    }
    

    return (
        
        <section className='login py-5 bg-light '>
            <div className='container '>
                <div className='shadow row g-0 rounded-4 bg-light '>
                    <div className='col-lg-5 '>
                        <div className='img'></div>
                    </div>
                    <div className='col-lg-7 py-5'>
                        <h1 className='fw-bolder p2 text-center ' >Welcome Back</h1>
                            <Form className='mt-5 mb-7 p-3' onSubmit={submitHandler}>
                                <Form.Group className="mb-4">
                                    <Form.Label className='ml-3 h6 p-2' >Email</Form.Label>
                                    <Form.Control className={'rounded-5 shadow-sm'}  placeholder="Enter your email"  onChange={(e) => setEmail(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-5">
                                    <Form.Label className=' ml-3  h6'>Password</Form.Label>
                                    <Form.Control className={'rounded-5 shadow-sm'} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
                                </Form.Group>

                                <Button className='ml-3  mb-3 shadow' variant={'primary'}type="submit">Submit</Button>

                        
                                <div className='mb-3'>
                                    <NavLink className='ml-3 text-primary' to={'/forgot'}>Forgot Password?</NavLink>
                                    
                                </div>
                            </Form>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Login
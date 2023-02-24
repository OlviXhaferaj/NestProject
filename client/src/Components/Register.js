import React, {useState} from 'react';
import {Button,Form, Card} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate , NavLink} from 'react-router-dom';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate()


    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/auth/signup',{
            name,
            email,
            password
        })
        .then(res => {
            console.log(res.data);
            navigate('/login')
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
                        <h1 className='fw-bolder p2 text-center ' >Register</h1>
                            <Form className='mt-5 mb-7 p-3' onSubmit={submitHandler}>
                            <Form.Group className="mb-4">
                    <Form.Label className='ml-3 h6 p-2'>Name</Form.Label>
                    <Form.Control className={'rounded-5 shadow-sm'} placeholder="Enter your name"  onChange={(e) => setName(e.target.value)}/>
                    
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label className='ml-3 h6 p-2' >Email</Form.Label>
                    <Form.Control className={'rounded-5 shadow-sm'}  placeholder="Enter your email"  onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label className='ml-3 h6 p-2'>Password</Form.Label>
                    <Form.Control className={'rounded-5 shadow-sm'} placeholder="Enter your password"  onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                                <div className='d-flex justify-content-between mt-5'>
                                    <Button className='ml-3  mb-3 shadow align-self-center' variant={'primary'}type="submit">Submit</Button>
                                    <div className='mb-3 mt-3'>
                                        <p >Already have an account?<br/>
                                    
                                        </p>
                                        <NavLink className=' text-primary' to={'/login'}>Log in</NavLink>
                                    
                                    </div>
                                </div>
                            </Form>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Register
import React, {useState, useEffect} from 'react';
import {Button,Form, Card} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Reset = () => {
    const [password, setPassword] = useState('');

    // Client side validation
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate()
    // const tt = "73h02dd18a"
    const {token} = useParams();
    useEffect(() => {
        console.log(token)
    },[])
    
    const submitHandler = (e) => {
        e.preventDefault();

        if(password.length<6){
            setPasswordError('Password must be at least 6 characters');
        }
        else{
            setPasswordError(null);
            axios.post('http://localhost:8000/api/reset', {
                token:token,
                password
                })
                .then(res => {
                    navigate('/login')
                    console.log(token);
                })
        }
        
    }

    return (
        <section className='login py-5 bg-light w-20 '>
            <div className='container '>
                <div className='shadow row g-0 rounded-4 bg-light '>
                    
                    <div className='col-lg-7 py-5'>
                        <h2 className='fw-bolder p2 text-center ' >Reset Password</h2>
                            <Form className='mt-5 mb-7 p-3' onSubmit={submitHandler}>
                                <Form.Group className="mb-4">
                                    <Form.Label className='ml-3 h6 p-2' >Password</Form.Label>
                                    <Form.Control className={'rounded-5 shadow'}  placeholder="Enter your password"  onChange={(e) => setPassword(e.target.value)}/>
                                </Form.Group>
                                {
                                    passwordError?
                                    <p className='text-danger'>{passwordError}</p>
                                    :
                                    null
                                }

                                <Button className='ml-3  mb-3 shadow' variant={'primary'}type="submit">Submit</Button>

                            </Form>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Reset
import {useState} from 'react';
import './Css/Login.css';
import {NavLink,useNavigate} from 'react-router-dom';
import {Button,Form} from 'react-bootstrap';
import axios from 'axios';

const Login = ({setIsLoggedIn, isLoggedIn}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    // Front end validation 
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        if(email.length === 0){
            setEmailError('Email must not be empty');
            if(password.length > 0){
                setPasswordError(null);
            } 
        }
        if(password.length < 6){
            setPasswordError('Password should be at least 6 characters');
            if(email.length > 0){
                setEmailError(null)
            }
            setErrors(null);
        }
        else {
            if(email.length > 0){
                setEmailError(null)
            }
            if(password.length === 6 || password.length > 6){
                setPasswordError(null);
            } 
            axios.post('http://localhost:8000/auth/login',{
            email,
            password
        },{
            withCredentials:true
        })
        .then((res) =>{ 
            setIsLoggedIn(true);
            console.log(res.data.token);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('isLoggedIn', true);
            }
        )
        .then(() => {
            navigate('/students/list');
        })
        .catch(err => {
            console.log(err)
            setErrors(err.response.data.message);
            }
        ) 
        }
        
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
                        <div className='pt-4 pl-4'>
                            {
                                errors?
                                <p style={{color: 'red'}}>{errors}</p>
                            : 
                                null
                            }
                        </div>

                            <Form className='mt-5 mb-7 p-3' onSubmit={submitHandler}>
                                <Form.Group className="mb-4">
                                    <Form.Label className='ml-3 h6 p-2' >Email</Form.Label>
                                    <Form.Control type='email' className={'rounded-5 shadow-sm'}  placeholder="Enter your email"  onChange={(e) => setEmail(e.target.value)}/>
                                    {
                                        emailError?
                                        <p style={{color:'red'}}>{emailError}</p>
                                        : null
                                    }
                                </Form.Group>
                                <Form.Group className="mb-5">
                                    <Form.Label className=' ml-3  h6'>Password</Form.Label>
                                    <Form.Control type='password' className={'rounded-5 shadow-sm'} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
                                    {
                                        passwordError?
                                        <p style={{color:'red'}}>{passwordError}</p>
                                        : null
                                    }
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
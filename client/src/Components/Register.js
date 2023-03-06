import {useState} from 'react';
import {Button,Form} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate , NavLink} from 'react-router-dom';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate=useNavigate()

    // front end validation
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        if(name.length === 0){
            setNameError('Name must not be empty');
            if(email.length > 0){
                setEmailError(null);
            }
            if(password.length > 0){
                setPasswordError(null);
            }
        }
        if(email.length === 0){
            setEmailError('Email must not be empty');
            if(name.length > 0){
                setNameError(null);
            }
            if(password.length === 6 || password.length > 6){
                setPasswordError(null);
            }
        }
        if(password.length <6){
            setPasswordError('Password must at least 6 characters');
            if(name.length > 0){
                setNameError(null);
            }
            if(email.length > 0){
                setEmailError(null);
            }
        }
        else{
            if(name.length > 0){
                setNameError(null);
            }
            if(email.length > 0){
                setEmailError(null);
            }
            if(password.length === 6 || password.length > 6){
                setPasswordError(null);
            }
    
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
                console.log(err);
                setErrors(err.response.data.message)
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
                        <h1 className='fw-bolder p2 text-center ' >Register</h1>
                        <div className='pt-4 pl-4'>
                            {errors.map((err, index) => <p style={{color:'red'}} key={index}> {err}</p>)}
                        </div>

                        <Form className='mt-5 mb-7 p-3' onSubmit={submitHandler}>
                            <Form.Group className="mb-4">
                                <Form.Label className='ml-3 h6 p-2'>Name</Form.Label>
                                <Form.Control type='text' className={'rounded-5 shadow-sm'} placeholder="Enter your name"  onChange={(e) => setName(e.target.value)}/>
                                {
                                    nameError?
                                    <p style={{color:'red'}}>{nameError}</p>
                                    : null
                                }
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label className='ml-3 h6 p-2' >Email</Form.Label>
                                <Form.Control type='email' className={'rounded-5 shadow-sm'}  placeholder="Enter your email"  onChange={(e) => setEmail(e.target.value)}/>
                                {
                                    emailError?
                                    <p style={{color:'red'}}>{emailError}</p>
                                    : null
                                }
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label className='ml-3 h6 p-2'>Password</Form.Label>
                                <Form.Control type='password' className={'rounded-5 shadow-sm'} placeholder="Enter your password"  onChange={(e) => setPassword(e.target.value)}/>
                                {
                                    passwordError?
                                    <p style={{color:'red'}}>{passwordError}</p>
                                    : null
                                }
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
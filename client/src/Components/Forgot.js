import {useState} from 'react';
import {Button,Form, Card} from 'react-bootstrap';
import axios from 'axios';


const Forgot = () => {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    // client side validations
    const [emailError, setEmailError] = useState('');

    const submitHandler =(e) => {
        e.preventDefault();

        if(email.length === 0){
            setEmailError('Email field should not be empty!');
        }
        else {
            setEmailError(null);
            axios.post('http://localhost:8000/api/forgot',{
                email
                })
                .then((res) => {
                    setSent(true);
                })
                .catch(errors => {
                    console.log(errors);
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
                                    <Form.Label className='ml-3 h6 p-2' >Email</Form.Label>
                                    <Form.Control className={'rounded-5 shadow'}  placeholder="Enter your email"  onChange={(e) => setEmail(e.target.value)}/>
                                    {
                                        emailError?
                                        <p className='pt-2 pl-2' style={{color:'red'}}>{emailError}</p>
                                        :
                                        null
                                    }
                                </Form.Group>

                                <Button className='ml-3  mb-3 shadow' variant={'primary'}type="submit">Submit</Button>

                                {
                                    sent ===true?
                                    <div>
                                        <p>Please check your mail, We have sent a message for you to reset the password.</p>
                                    </div>
                                    : null
                                }
                                
                            </Form>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Forgot
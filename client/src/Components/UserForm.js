import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate, NavLink} from 'react-router-dom';
import {Button, Form, Card} from 'react-bootstrap';

const UserForm = () => {

    const [name, setName]= useState('');
    const [lastName, setLastName]= useState('');

    const [errors, setErrors] = useState([]);

    // Front end errors
    const [nameError, setNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token")
        let config = {
            withCredentials:true,
            headers: {
                Authorization: 'Bearer '+ token ,
            }
        }

        if(name.length < 3){
            setNameError('Name must be at least 3 characters');
        }
        if(lastName.length < 4){
            setLastNameError('Last Name must be at least 4 characters');
        }
        else {
            axios.post('http://localhost:8000/students', {
            name,
            lastName
        },
            config
        )
        .then((res) => {
            console.log(res, 'this si res');
            navigate('/students/list')
            console.log(res.data, 'this is data')
            console.log(res.request, 'this is req')
        })
        .catch( err => {
            console.log(err.response.data.message, 'this is the data errors')
            setErrors(err.response.data.message)
            }
        )
        }
        
    }
    

    return (
        <Card className='container shadow-sm mt-5 mb-4 p-3 container-sm-screen'>

            <Form className='m-3' onSubmit={handleSubmit}>
                <h3 className='mb-5'>Fill in the student details</h3>
                <div className='pt-4 pl-4'>
                    {/* {errors.map((err, index) => <p style={{color:'red'}} key={index}> {err}</p>)} */}
                </div>
                
                <div>
                    <Form.Group className="mb-4 mx-2" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                        {
                            nameError? 
                            <p style={{color:'red'}}>{nameError}</p>
                        :
                            null
                        }
                    </Form.Group>
                    
                    <Form.Group className="mb-4 mx-2" controlId="formBasicPassword">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter surname" onChange={(e) => setLastName(e.target.value)}/>
                        {
                            lastNameError? 
                            <p style={{color:'red'}}>{lastNameError}</p>
                        :
                            null
                        }
                    </Form.Group>
                </div>
                
                <Button className='mt-3 mx-2' variant="primary" type="submit">Submit</Button>
                <div className='mt-5 mb-3'>
                    <NavLink className={'mt-2'} to={'/students/list'}>Back to the list of students</NavLink>
                </div>
            </Form>
        </Card>
    )
}

export default UserForm
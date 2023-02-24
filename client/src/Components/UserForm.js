import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Button, Form, Card} from 'react-bootstrap';

const UserForm = () => {

    const [name, setName]= useState('');
    const [lastName, setLastName]= useState('');
    const [maths, setMaths] = useState('A');
    const [english, setEnglish] = useState('A');
    const [physics, setPhysics] = useState('A');
    const [chemistry, setChemistry] = useState('A');
    const [history, setHistory] = useState('A');
    const [sports, setSports] = useState('A');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(maths)
        let token = localStorage.getItem("token")
        let config = {
            withCredentials:true,
            headers: {
                Authorization: 'Bearer '+ token ,
            }
        }
        axios.post('http://localhost:8000/students', {
            name,
            lastName,
            subjects:{
                maths:maths,
                english:english,
                physics:physics,
                chemistry:chemistry,
                history:history,
                sports:sports
            }
        },
            config
        )
        .then((res) => {
            console.log(res);
            navigate('/students/list')
        })
        .catch( err => console.log(err))
    }
    

    return (
        <Card className='container shadow-sm mt-5 mb-4 p-3 container-sm-screen'>

            <Form className='m-3' onSubmit={handleSubmit}>
                <h3 className='mb-5'>Fill in the student details</h3>
                <div>
                    <Form.Group className="mb-4 mx-2" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-4 mx-2" controlId="formBasicPassword">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter surname" onChange={(e) => setLastName(e.target.value)}/>
                    </Form.Group>
                </div>

                    <Form.Group className="mb-4 mx-2" controlId="formBasicPassword">
                        <Form.Label>Grades</Form.Label>

                    <Form.Group className="mb-4 mx-2" controlId="formBasicPassword">
                        <Form.Label>Maths</Form.Label>
                        <select className='form-select' onChange={(e) => setMaths(e.target.value)}>
                            <option></option>
                            <option value={'A'}>A</option>
                            <option value={'B'}>B</option>
                            <option value={'C'}>C</option>
                            <option value={'D'}>D</option>
                            <option value={'E'}>E</option>
                            <option value={'F'}>F</option>
                        </select>
                        <Form.Label>English</Form.Label>

                        <select className='form-select' onChange={(e) => setEnglish(e.target.value)}>
                            <option></option>
                            <option value={'A'}>A</option>
                            <option value={'B'}>B</option>
                            <option value={'C'}>C</option>
                            <option value={'D'}>D</option>
                            <option value={'E'}>E</option>
                            <option value={'F'}>F</option>
                        </select>
                        <Form.Label>Physics</Form.Label>

                        <select className='form-select' onChange={(e) => setPhysics(e.target.value)}>
                            <option></option>
                            <option value={'A'}>A</option>
                            <option value={'B'}>B</option>
                            <option value={'C'}>C</option>
                            <option value={'D'}>D</option>
                            <option value={'E'}>E</option>
                            <option value={'F'}>F</option>
                        </select>
                        <Form.Label>Chemistry</Form.Label>

                        <select className='form-select' onChange={(e) => setChemistry(e.target.value)}>
                            <option></option>
                            <option value={'A'}>A</option>
                            <option value={'B'}>B</option>
                            <option value={'C'}>C</option>
                            <option value={'D'}>D</option>
                            <option value={'E'}>E</option>
                            <option value={'F'}>F</option>
                        </select>
                        <Form.Label>History</Form.Label>

                        <select className='form-select' onChange={(e) => setHistory(e.target.value)}>
                            <option></option>
                            <option value={'A'}>A</option>
                            <option value={'B'}>B</option>
                            <option value={'C'}>C</option>
                            <option value={'D'}>D</option>
                            <option value={'E'}>E</option>
                            <option value={'F'}>F</option>
                        </select>
                        <Form.Label>Sports</Form.Label>

                        <select className='form-select' onChange={(e) => setSports(e.target.value)}>
                            <option></option>
                            <option value={'A'}>A</option>
                            <option value={'B'}>B</option>
                            <option value={'C'}>C</option>
                            <option value={'D'}>D</option>
                            <option value={'E'}>E</option>
                            <option value={'F'}>F</option>
                        </select>
                    </Form.Group>
                    
                </Form.Group>
                
                <Button className='mt-3 mx-2' variant="primary" type="submit">Submit</Button>
            </Form>
        </Card>
    )
}

export default UserForm
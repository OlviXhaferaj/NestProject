import {useEffect, useState} from 'react'
import axios from 'axios';
import {  NavLink,useNavigate, useParams } from 'react-router-dom';
import {Button, Form, Card} from 'react-bootstrap';

const Update = () => {
    const {id} = useParams();

    const [students, setStudents] = useState([]);
    const [staticName, setStaticName] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    // const [maths, setMaths] = useState('A');
    // const [english, setEnglish] = useState('A');
    // const [physics, setPhysics] = useState('A');
    // const [chemistry, setChemistry] = useState('A');
    // const [history, setHistory] = useState('A');
    // const [sports, setSports] = useState('A');

    // Client side Validation
    const [nameError, setNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("token")
        let config = {
            withCredentials:true,
            headers: {
                Authorization: 'Bearer '+ token ,
            }
        }
        
        axios.get('http://localhost:8000/students',config)
        .then((res) => {
            setStudents(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        let token = localStorage.getItem("token")
        let config = {
            withCredentials:true,
            headers: {
                Authorization: 'Bearer '+ token ,
            }
        }
        axios.get('http://localhost:8000/students/'+ id, config)
        .then(res => {
            setStaticName(res.data.name);
            setName(res.data.name);
            setLastName(res.data.lastName);
            // setMaths(res.data.subjects.maths);
            // setEnglish(res.data.subjects.english);
            // setPhysics(res.data.subjects.physics);
            // setChemistry(res.data.subjects.chemistry);
            // setHistory(res.data.subjects.history);
            // setSports(res.data.subjects.sports);
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const updateStudent = (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token")
        let config = {
            withCredentials:true,
            headers: {
                Authorization: 'Bearer '+ token ,
            }
        }

        if(name.length<3){
            setNameError('Name must be at least 3 characters')
            if(lastName.length>3){
                setLastNameError(null);
            }
        }
        if(lastName.length<4){
            setLastNameError('Last Name must be at least 4 characters')
            if(name.length >2){
                setNameError(null);
            }
        }
        else {
            setNameError(null);
            setLastNameError(null);
            axios.patch('http://localhost:8000/students/' +id, {
                name,
                lastName
            },
            config
            )
                .then(res => {
                    console.log(res);
                    navigate('/students/list')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        
    }
    const cancelHandle = () => {
        navigate('/students/list')
    }
        const foundItem = students.find((item) => {
            return item._id === id
        })
    return (
        <div className='container mx-auto shadow-sm p-3 my-5'>
            <h3>Student: {staticName}</h3>
            {
                foundItem ?
                <Card className='container mt-5 mb-4 p-3'>
                    <Form onSubmit={updateStudent}>
                        <Form.Group className="mb-4 mx-2" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={name} type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                            {
                                nameError?
                                <p className={'text-danger'}>{nameError}</p>
                                : null
                            }
                        </Form.Group>

                        <Form.Group className="mb-4 mx-2" controlId="formBasicPassword">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control value={lastName} type="text" placeholder="Enter surname" onChange={(e) => setLastName(e.target.value)}/>
                            {
                                lastNameError?
                                <p className={'text-danger'}>{lastNameError}</p>
                                : null
                            }
                        </Form.Group>
        {/* <Form.Group className="mb-4 mx-2" controlId="formBasicPassword">
                    <Form.Label>Grades</Form.Label>

                <Form.Group className="mb-4 mx-2" controlId="formBasicPassword">
                    <Form.Label>Maths</Form.Label>
                    <select value={maths} className='form-select' onChange={(e) => setMaths(e.target.value)}>
                        <option></option>
                        <option value={'A'}>A</option>
                        <option value={'B'}>B</option>
                        <option value={'C'}>C</option>
                        <option value={'D'}>D</option>
                        <option value={'E'}>E</option>
                        <option value={'F'}>F</option>
                    </select>
                    <Form.Label>English</Form.Label>

                    <select value={english} className='form-select' onChange={(e) => setEnglish(e.target.value)}>
                        <option></option>
                        <option value={'A'}>A</option>
                        <option value={'B'}>B</option>
                        <option value={'C'}>C</option>
                        <option value={'D'}>D</option>
                        <option value={'E'}>E</option>
                        <option value={'F'}>F</option>
                    </select>
                    <Form.Label>Physics</Form.Label>

                    <select value={physics} className='form-select' onChange={(e) => setPhysics(e.target.value)}>
                        <option></option>
                        <option value={'A'}>A</option>
                        <option value={'B'}>B</option>
                        <option value={'C'}>C</option>
                        <option value={'D'}>D</option>
                        <option value={'E'}>E</option>
                        <option value={'F'}>F</option>
                    </select>
                    <Form.Label>Chemistry</Form.Label>

                    <select value={chemistry} className='form-select' onChange={(e) => setChemistry(e.target.value)}>
                        <option></option>
                        <option value={'A'}>A</option>
                        <option value={'B'}>B</option>
                        <option value={'C'}>C</option>
                        <option value={'D'}>D</option>
                        <option value={'E'}>E</option>
                        <option value={'F'}>F</option>
                    </select>
                    <Form.Label>History</Form.Label>

                    <select value={history} className='form-select' onChange={(e) => setHistory(e.target.value)}>
                        <option></option>
                        <option value={'A'}>A</option>
                        <option value={'B'}>B</option>
                        <option value={'C'}>C</option>
                        <option value={'D'}>D</option>
                        <option value={'E'}>E</option>
                        <option value={'F'}>F</option>
                    </select>
                    <Form.Label>Sports</Form.Label>

                    <select value={sports} className='form-select' onChange={(e) => setSports(e.target.value)}>
                        <option></option>
                        <option value={'A'}>A</option>
                        <option value={'B'}>B</option>
                        <option value={'C'}>C</option>
                        <option value={'D'}>D</option>
                        <option value={'E'}>E</option>
                        <option value={'F'}>F</option>
                    </select>
                </Form.Group>
    </Form.Group> */}

                        <Button className='mt-3 mx-2' variant="primary" type="submit">Submit</Button>
                        
                    </Form>

                </Card>
                :
                <div>
                    <p>"We're sorry, but the student you are looking for, couldn't be found. If you want to add Student to our database, you can click down below.</p>
                    <NavLink to={'/students'}>New</NavLink>
                </div>
            }
            <div className='mt-5 mb-3'>
                <NavLink className={'mt-2'} to={`/students/list/students/${id}`}>Back</NavLink>
            </div>
        </div>
    ) 
}

export default Update
import React, {useState, useEffect} from 'react'
import {Card, Button, Form} from 'react-bootstrap';
import axios from 'axios';
import { NavLink,useNavigate, useParams } from 'react-router-dom';

const UpdateSubjects = (props) => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [maths, setMaths] = useState('A');
    const [english, setEnglish] = useState('A');
    const [physics, setPhysics] = useState('A');
    const [chemistry, setChemistry] = useState('A');
    const [history, setHistory] = useState('A');
    const [sports, setSports] = useState('A');


    useEffect(() => {
        console.log(id);
        let token = localStorage.getItem("token");
        let config = {
            withCredentials:true,
            headers: {
                Authorization: 'Bearer '+ token ,
            }
        }
        axios.get('http://localhost:8000/subs/'+id,
        config)
        .then((res) => {
            console.log(res, 'this is the subjects res');
            setMaths(res.data.subjects.maths);
            setEnglish(res.data.subjects.english);
            setPhysics(res.data.subjects.physics);
            setChemistry(res.data.subjects.chemistry);
            setHistory(res.data.subjects.history);
            setSports(res.data.subjects.sports);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        let token = localStorage.getItem("token");
        let config = {
            withCredentials:true,
            headers: {
                Authorization: 'Bearer '+ token ,
            }
        }
        axios.patch('http://localhost:8000/subs/'+id, {
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
            navigate(`/students/list`)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <Card className='container shadow-sm mt-5 mb-4 p-3 container-sm-screen'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4 mx-2" controlId="formBasicPassword">
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
                </Form.Group>
                <Button className='mt-3 mx-2' variant="primary" type="submit">Submit</Button>
            </Form>
        </Card>
    )
}

export default UpdateSubjects
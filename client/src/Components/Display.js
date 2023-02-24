import React, {useState, useEffect} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import DeleteStudent from './DeleteStudent';
// Bootstrap imports
import {Card, Table} from 'react-bootstrap'


const Display = () => {
    const {id} = useParams();

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [maths, setMaths] = useState('');
    const [english, setEnglish] = useState('');
    const [physics, setPhysics] = useState('');
    const [chemistry, setChemistry] = useState('');
    const [history, setHistory] = useState('');
    const [sports, setSports] = useState('');
    
    const [studentId, setStudentId] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/students/'+id)
        .then((res) => {
            setName(res.data.name);
            setLastName(res.data.lastName);
            setStudentId(res.data._id);
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

    return (
        <Card className='container text-center mt-5 mb-5 p-5'>
            <h1 className='pb-4'>Details about {name}</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Subjects</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Maths</td>
                        <td>{maths}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>English</td>
                        <td>{english}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>physics</td>
                        <td>{physics}</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>chemistry</td>
                        <td>{chemistry}</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>History</td>
                        <td>{history}</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Sports</td>
                        <td>{sports}</td>
                    </tr>
                </tbody>
            </Table>
            <div className=' mt-5 mb-3'>
                <DeleteStudent name={name} studentId={studentId} />
                <NavLink className={'btn btn-dark mt-2'} to={'/students/list'}>Back to the list of students</NavLink>

            </div>
            

        </Card>
    )
}

export default Display
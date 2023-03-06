import {useState, useEffect} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Bootstrap imports
import {Table, Button} from 'react-bootstrap'


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
    const [subjectsId, setSubjectsId] = useState('');

    const navigate = useNavigate();
    
    const gradesHandle = (id) => {
        navigate(`/students/${id}/grades`)
    }

    // const updateHandle = (id) => {
    //     navigate(`/students/${subjectsId}/edit/grades`)
    // }

    useEffect(() => {
        let token = localStorage.getItem("token");
        let config = {
            withCredentials:true,
            headers: {
                Authorization: 'Bearer '+ token ,
            }
        }
        axios.get('http://localhost:8000/students/'+id, config)
        .then((res) => {
            setName(res.data.name);
            setLastName(res.data.lastName);
            setStudentId(res.data._id);
            setMaths(res.data.subjects_id.subjects.maths);
            setEnglish(res.data.subjects_id.subjects.english);
            setPhysics(res.data.subjects_id.subjects.physics);
            setChemistry(res.data.subjects_id.subjects.chemistry);
            setHistory(res.data.subjects_id.subjects.history);
            setSports(res.data.subjects_id.subjects.sports);

            setSubjectsId(res.data.subjects_id._id);
            console.log(subjectsId, 'this is subjects id');
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    return (
            <div className='text-center mt-5 mb-5 p-5'>
                <h1 className='pb-4'>Details about {name}</h1>
                {
                    subjectsId.length>0?
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
                :
                <div>
                    <p>This student doesnt have any grades assigned. If you want to fill in the grades, please press the button below.</p>
                    <Button onClick={()=>gradesHandle(id)} variant={'primary'}>Grade</Button>
                    <p className='mt-5'>or if you want to change the students name and last name, you can update his credentials here.</p>
                    <NavLink variant={'outline-primary'} to={`/students/${id}/edit`}>Update Student {name}</NavLink>
                </div>
                }
                
                <div>
                    {
                        subjectsId.length >0?
                        <div>
                            <NavLink className={'mb-4'} to={`/students/${id}/edit`}>Update Student name</NavLink><br/>
                            <NavLink className={'mt-4'}  variant={'outline-primary'} to={`/students/edit/grades/${subjectsId}`}>Update Student grades.</NavLink>
                        </div>
                        :
                        null
                    }
                </div>
                    <div className='mt-5 mb-3'>
                        <NavLink className={'mt-2'} to={'/students/list'}>Back to the list of students</NavLink>
                    </div>
            </div>
    )
}

export default Display
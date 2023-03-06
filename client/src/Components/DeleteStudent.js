import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const DeleteStudent = (props) => {
    const {studentId, students, setStudents} = props;
    const navigate = useNavigate();
    let token = localStorage.getItem("token")
    let config = {
        withCredentials:true,
        headers: {
            Authorization: 'Bearer '+ token ,
        }
    }
    const deletehandle = (e) => {
        axios.delete('http://localhost:8000/students/'+ studentId, config)
        .then((res) => {
            const newStudentArr = students.filter(item => item._id !==studentId)
            console.log(newStudentArr, 'this is the new array');
            setStudents(newStudentArr);

            navigate('/students/list');
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <Button className='mr-2' variant={'danger'} onClick={deletehandle}>Delete</Button>
        </div>
    )
}

export default DeleteStudent
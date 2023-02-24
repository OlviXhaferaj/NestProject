import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteStudent = (props) => {
    const { name,studentId} = props;
    const navigate = useNavigate();
    const deletehandle = (e) => {
        axios.delete('http://localhost:8000/students/'+ studentId)
        .then((res) => {
            navigate('/students/list')
        })
        .catch((err) => {
            console.log(err);
        })
    }
    return (
        <div>
            <button className='btn btn-danger ' onClick={deletehandle}> Remove Student</button>
        </div>
    )
}

export default DeleteStudent
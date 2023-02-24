import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const getFilteredItems = (query, students, select) => {
    if(!query){
        return students
    }
    else if (select==="name"){
        return students.filter((students) => students.name.includes(query));
    }
    return students.filter((students) => students.lastName.includes(query));
};


const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [query, setQuery] = useState(''); 
    const [select, setSelect] = useState('name');
    
    const [maths, setMaths] = useState('');


    const filteredItems = getFilteredItems(query, students, select);

    const navigate = useNavigate();

    const updateHandle = (id) => {
        navigate(`students/${id}/edit`)
    }

    const detailsHandle = (id) => {
        navigate(`students/${id}`)
    }

    useEffect(() => {
        axios.get('http://localhost:8000/students')
        .then((res) => {
            console.log(res);
            setStudents(res.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    let sorted = [...students].sort((a,b) => a.name > b.name ? 1 : -1)

    return (
        <div className='container my-5'>
            <h2 className='pb-3' >These are all of the students</h2>
            
            
            <div className='mb-4'>
                <label className='h5 mr-3'>Search for the student</label>
                <select className='mr-3' onChange={(e) => setSelect(e.target.value)}>
                    <option value={"name"}>Student name</option>
                    <option value={"lastName"}>Student Last Name</option>
                </select>
            <input type={'text'} onChange={(e)=> setQuery(e.target.value)} placeholder={'Search...'}/>
            </div>

            <table className="table table-striped bordered hovered rounded border ">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Last name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
            {
                !query ?
        
                sorted.map((item, index) => {
                    return (
                        <tbody key={index}>
                            <tr>
                                    <td>{item.name}</td>
                                    <td>{item.lastName}</td>
                                    
                                    <td>
                                        <button onClick={()=>detailsHandle(item._id)} className="btn btn-light">Details</button>
                                        <button onClick={()=>updateHandle(item._id)} className="btn btn-light ml-2">Edit</button>
                                    </td>
                            </tr>
                        </tbody>
                    )
                })
            :
            
                filteredItems.map((item, index) => {
                    return (
                        <tbody key={index}>
                            <tr>
                                    <td >{item.name}</td>
                                    <td>{item.lastName}</td>
                                    
                                    <td >
                                                <button onClick={()=>detailsHandle(item._id)} className="btn btn-light">Details</button>
                                                <button onClick={()=>updateHandle(item._id)} className="btn btn-light">Edit</button>
                                    </td>
                            </tr>
                        </tbody>
                    )
                })
            }
            </table>
        </div>
    )
}

export default StudentList
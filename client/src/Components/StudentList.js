import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import DeleteStudent from './DeleteStudent';
import { Form, Button } from 'react-bootstrap';

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
    const [filteredItems, setFilteredItems] = useState([]);

    const navigate = useNavigate();

    const gradesHandle = (id) => {
        navigate(`/students/${id}/grades`)
    }

    const detailsHandle = (id) => {
        navigate(`students/${id}`)
    }

    useEffect(() => {
        let token = localStorage.getItem("token");
        let config = {
            withCredentials:true,
            headers: {
                Authorization: 'Bearer '+ token ,
            }
        }
        axios.get('http://localhost:8000/students', config)
        .then((res) => {
            console.log(res);
            setStudents(res.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    // Search bar button function 
    const onSearch = (searchQuery) => {
        console.log(query, 'this is query');
        console.log('search', searchQuery);
        const items = getFilteredItems(query, students, select);
        console.log(items);
        setFilteredItems(items);
        console.log(filteredItems, 'this is the filtered Items');
    }

    const onSearchInput = (searchQuery ) => {
        setQuery(searchQuery);
    }

    useEffect(() => {
        setFilteredItems(null);
    }, [])

    let sorted = [...students].sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)

    return (
        <div className='container my-5'>
            <h2 className='pb-3' >These are all of the students</h2>
            
            
            <div className='mb-4'>
                <div>
                    <label className='h5 mr-3'>Search for the student</label>
                    <select className='mr-3' onChange={(e) => setSelect(e.target.value)}>
                        <option value={"name"}>Student name</option>
                        <option value={"lastName"}>Student Last Name</option>
                    </select>
                    
                    <div className='d-flex'>
                        <Form.Control className='w-50' value={query} type={'text'} onChange={(e)=> setQuery(e.target.value)} placeholder={'Search...'}/>
                        <Button variant="outline-primary ml-1" onClick={() => onSearch(query)}>Search</Button>
                    </div>
                </div>
                <div className='dropdown w-50 pl-2'>
                    {
                        select==='name'?
                        sorted.filter(item => {
                            const searchTerm = query.toLowerCase();
                            const fullName = item.name.toLowerCase();
    
                            //checking if the value we are putting in the seach field exists in the database
                            return query && fullName.startsWith(searchTerm) && fullName !== query;
                        })
                        // The slice method lets us see only a specific number of options without showing every single one of them
                        .slice(0,5)
                        .map((item, index) => {
                            return (<div key={index} onClick={() => onSearchInput(item.name)} className='dropdown-row'>
                                {item.name}
                            </div>
                            )
                        })
                        :
                        sorted.filter(item => {
                            const searchTerm = query.toLowerCase();
                            const LastName = item.lastName.toLowerCase();
    
                            //checking if the value we are putting in the seach field exists in the database
                            return query && LastName.startsWith(searchTerm) && LastName !== query;
                        })
                        // The slice method lets us see only a specific number of options without showing every single one of them
                        .slice(0,5)
                        .map((item, index) => {
                            return (<div key={index} onClick={() => onSearchInput(item.lastName)} className='dropdown-row'>
                                {item.lastName}
                            </div>
                            )
                        })
                    }
                </div>
                
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
                !filteredItems ?
        
                sorted.map((item, index) => {
                    return (
                        <tbody key={index}>
                            <tr>
                                    <td>{item.name}</td>
                                    <td>{item.lastName}</td>
                                    
                                    <td className='d-flex'>
                                        <DeleteStudent setStudents={setStudents} students={students} studentId={item._id} />
                                        <Button onClick={()=>detailsHandle(item._id)} variant={'primary'}>Details</Button>
                                        {/* {
                                            item.subjects_id.length>0?
                                            <Button onClick={()=>gradesHandle(item._id)} variant={'primary'}>Grade</Button>
                                            :
                                            null
                                        } */}
                                    </td>
                            </tr>
                        </tbody>
                    )
                })
            :
            // filtered Items
            filteredItems.map((item, index) => {
                    return (
                        <tbody key={index}>
                            <tr>
                                    <td >{item.name}</td>
                                    <td>{item.lastName}</td>
                                    
                                    <td className='d-flex'>
                                        <DeleteStudent setStudents={setStudents} students={students} studentId={item._id} />
                                        <button onClick={()=>detailsHandle(item._id)} className="btn btn-primary">Details</button>
                                        {/* <Button onClick={()=>gradesHandle(item._id)} variant={'primary'}>Grade</Button> */}
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
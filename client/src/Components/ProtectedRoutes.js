import {Navigate, Outlet} from 'react-router-dom';


const ProtectedRoutes = () => {
    // test
    return localStorage.getItem('token') !== null? <Outlet/> : <Navigate to={'/login'}/>
}

export default ProtectedRoutes
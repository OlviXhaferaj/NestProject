import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <footer  className="bg-dark text-white pt-5 pb-4 mt-5">
            <div className='container text-center text-md-left'>
            
                <div className='row text-center text-md-left '>
                    <div className='test col-md-3 col-lg-3 col-xl-3 mx-auto mt-3'>
                        <h5 className='text-uppercase mb-4 font-weight-bold text-danger'>React-Bootstrap</h5>
                        <blockquote>
                            <p> “Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid.”</p>
                            <p>-<b>Alber Einstein</b></p>
                        </blockquote>
                    </div>
                    
                    <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mt-3'>
                        <h5 className='text-uppercase mb-4 font-weight-bold text-light'>Pages</h5>
                        <p><NavLink className='font-weight-bold text-light' to={'/students/list'}>Student List</NavLink></p>
                        <p><NavLink className='font-weight-bold text-light' to={'/students'}>Add Student</NavLink></p>
                    </div>
                    <div className='col-md-4 col-lg-3 col-xl3 mx-auto mt-3'>
                        <h5 className='text-uppercase mb-4 font-weight-bold text-light'>Address and contact info</h5>
                        <p>
                            Tirane, 1251235
                        </p>
                        <p>
                            ...@gmail.com
                        </p>
                        <p>
                            +000 00 00 000
                        </p>
                        <p>
                            +222 22 22 222
                        </p>
                    </div>
                    
                </div>
            </div>
        </footer>
    )
}

export default Footer
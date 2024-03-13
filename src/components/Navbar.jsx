import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../feature/auth/authSlice';

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleOut = () => {
        dispatch(logOut())
        navigate("/login")
    }

    return (
        <>
            <nav className="navbar bg-dark">
                <div className="container-fluid">
                    <Link to={"/"} className="navbar-brand mb-0 h1 text-light">Auth-App</Link>
                    <span>
                        {!user ? (
                            <>
                                <Link to={"/Login"} className='btn btn-sm btn-primary mx-1'>Login</Link>
                                <Link to={"/Register"} className='btn btn-sm btn-success mx-1'>Register</Link>
                            </>
                        ) : (

                            <button className='btn btn-sm btn-danger' onClick={handleOut}>LogOut</button>
                        )
                        }
                    </span>
                </div>
            </nav>
        </>
    )
}

export default Navbar
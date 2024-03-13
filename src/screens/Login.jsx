import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userlogin } from '../feature/auth/authSlice';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isSuccess, isError, message } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const { email, password } = formData;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(userlogin(formData))
    }
    useEffect(() => {
        if (user || isSuccess) {
            navigate("/")
        }

        if (isError && message) {
            toast.error(message)
        }

    }, [user, isSuccess, isError, message])

    return (
        <>
            <div className="container p-5">
                <form onSubmit={handleSubmit}>
                    <input className='form-control my-2' type="text" placeholder='Enter Mail' name='email' value={email} onChange={handleChange} />
                    <input className='form-control my-2' type="password" placeholder='Enter Password' name='password' value={password} onChange={handleChange} />
                    <button className='btn btn-primary w-100'>Login</button>
                </form>
            </div>
        </>
    )
}

export default Login
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userRegister } from '../feature/auth/authSlice';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isSuccess, isError, message, isLoading } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        conformPass: "",
    })
    const { name, email, password, conformPass } = formData;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === conformPass) {
            dispatch(userRegister(formData));
        } else {
            toast.error("Password Not Match")
        }

    };

    useEffect(() => {

        if (user || isSuccess) {
            navigate("/")
        }

        if (isError || message) {
            toast.error(message)
        }
    }, [user, isSuccess, isError, message])

    if (isLoading) {
        return (
            <div className="container p-5">
                <h1 className="display-5 text-center text-secondary">Loading...</h1>
            </div>
        );
    }

    return (
        <>
            <div className="container p-5">
                <form onSubmit={handleSubmit}>
                    <input className='form-control my-2' type="name" name='name' onChange={handleChange} value={name} placeholder='Enter Name ' />
                    <input className='form-control my-2' type="email" name='email' onChange={handleChange} value={email} placeholder='Enter Mail ' />
                    <input className='form-control my-2' type="password" name='password' onChange={handleChange} value={password} placeholder='Enter Password ' />
                    <input className='form-control my-2' type="password" name='conformPass' onChange={handleChange} value={conformPass} placeholder='Confrom Password ' />
                    <button className='btn btn-success w-100'>Register</button>
                </form>
            </div>
        </>
    )
}

export default Register
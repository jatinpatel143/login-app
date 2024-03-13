import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const nevigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            nevigate("/Login")
        }
    }, [user])

    return (
        <>
            <div className="container p-4">
                <h1 className='text-center display-2'>Welcome to Users</h1>
            </div>
        </>
    )
}

export default Home
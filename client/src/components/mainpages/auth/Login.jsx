import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const handleChangeForm = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const loginSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/user/login', user)
            localStorage.setItem('firstLogin', true)
            window.location.href = '/'
        }
        catch (error) {
            alert(error.response.data.message)
        }

    }


    return (
        <div className='login-page'>
            <form onSubmit={loginSubmit} >
                <h2>Login</h2>
                <input
                    type='email'
                    name='email'
                    required
                    placeholder='Email'
                    value={user.email}
                    onChange={handleChangeForm}
                />
                <input
                    type='password'
                    name='password'
                    required
                    placeholder='Password'
                    autoComplete='true'
                    value={user.password}
                    onChange={handleChangeForm}
                />
                <div className='row'>
                    <button type='submit'>Login</button>
                    <Link to='/register'>Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login

import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import './AuthPage.scss'

function AuthPage() {
    const auth = useContext(AuthContext)
    const { loading, request, error } = useHttp()

    const [form, setForm] = useState({
        email: '',
        fullName: '',
        password: '',
        id: ''
    })

    useEffect(() => {

    }, [error])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form }, { "Content-Type": "application/json" })
        } catch (e) {
            console.log("error", e)
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form }, { "Content-Type": "application/json" })
            auth.login(data.token)
            console.log(data.message)
        } catch (e) {
            console.log("error", e)
        }
    }

    return (
        <div className="authPage">
            <div className="auth">
                <h1>Authorization</h1>
                <input type="text" placeholder="Enter Email" name="email" onChange={changeHandler} />
                <input type="text" placeholder="Enter fullname" name="fullName" onChange={changeHandler} />
                <input type="password" placeholder="Enter password" name="password" onChange={changeHandler} />
                <div className="login_signup">
                    <button disabled={loading} onClick={loginHandler}>Log In</button>
                    <button className="signup" onClick={registerHandler} disabled={loading}>SignUp</button>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
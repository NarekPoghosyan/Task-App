import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook';
import './HomePage.scss'

function HomePage() {
    const auth = useContext(AuthContext);
    const { loading, request, error } = useHttp()
    const [editForm, setEditForm] = useState({
        email: '',
        fullName: '',
        password: ''
    })

    const changeInputHandler = (event) => {
        return setEditForm({ ...editForm, [event.target.name]: event.target.value })
    }

    const editEmail = async () => {
        try {
            const data = await request('/api/edit/email', 'PUT', { ...editForm }, { "Content-Type": "application/json" })
        } catch (e) {
            console.log("error", e)
        }
    }

    const editFullName = async () => {
        try {
            const data = await request('/api/edit/fullName', 'POST', { ...editForm }, { "Content-Type": "application/json" })
        } catch (e) {
            console.log("error", e)
        }
    }

    const editPassword = async () => {
        try {
            const data = await request('/api/edit/password', 'POST', { ...editForm }, { "Content-Type": "application/json" })
        } catch (e) {
            console.log("error", e)
        }
    }

    const deleteProfile = async () => {
        try {
            const response = await fetch('/api/edit/delete', {
                method: 'DELETE'
            })
            const deleted = await response.json()
            localStorage.removeItem('userData')

            window.location.reload(false);

        } catch (e) {
            console.log("error", e)
        }
    }

    return (
        <div className="homePage">
            <div className="editEmail">
                <h1>Email: {auth.email}</h1>
                <input type="text" placeholder="Enter new email" name="email" onChange={changeInputHandler} />
                <button onClick={editEmail}>Edit email</button>
            </div>
            <div className="fullname">
                <h1>fullname: {auth.fullName}</h1>
                <input type="text" placeholder="Enter new fullname" name="fullName" onChange={changeInputHandler} />
                <button onClick={editFullName}>Edit fullname</button>
            </div>
            <div className="editPassword">
                <input type="text" placeholder="Enter new password" name="password" onChange={changeInputHandler} />
                <button onClick={editPassword}>Edit Password</button>
            </div>
            <div className="editPassword">
                <button onClick={deleteProfile}>Delete Profile</button>
            </div>
        </div>
    )
}

export default HomePage
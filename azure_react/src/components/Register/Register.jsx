import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
    const { token } = useSelector(state => state.login)
    const [error, setError] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        const data = {
            username: username,
            password: password,
            email: email
        }
        const body = {
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': token
            },
            withCredentials: true
        }
        await axios.post(`${import.meta.env.VITE_API_URL}/register/`, data, body)
            .then(response => {
                navigate('/login')
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setError(error.response.data.error)
                }
                else {
                    setError("Something went wrong")
                }
            });
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    return <>
        <div className="login-details">
            <div className="login-header">
                <div className="login-header-1">Register for an Account</div>
                <div className="login-header-2">Create an account to post a new blog</div>
            </div>
            <form onSubmit={handleRegisterSubmit}>
                <div className="login-input-1">
                    <label>Username</label>
                    <input placeholder="username" type="text" onChange={handleUsernameChange} value={username}></input>
                </div>
                <div className="login-input-2">
                    <label>Password</label>
                    <input placeholder="password" type="text" onChange={handlePasswordChange} value={password}></input>
                </div>
                 <div className="login-input-2">
                    <label>Email</label>
                    <input placeholder="email" type="text" onChange={handleEmailChange} value={email}></input>
                </div>
                {error ? <div style={{color:"red"}}>{error}
                </div> : <></>}
                <button className="welcome-blog-login" type="submit">Register</button>
            </form>
            <div className="login-footer">
                <div className="login-footer-1">Already have an Account</div>
                <div onClick={() => navigate('/login')} className="login-footer-2">Login</div>
            </div>
        </div>
    </>
}

export default Register 
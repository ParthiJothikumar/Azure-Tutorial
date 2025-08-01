import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchUserSucess, fetchUserFailed } from "../../redux/features/Login/loginSlice";
import axios from "axios"
import "./Login.css"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector(state => state.login)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        const data = {
            username: username,
            password: password
        }
        const body = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': token
            },
            withCredentials: true
        }
        console.log(body);

        await axios.post(`${import.meta.env.VITE_API_URL}/login/`, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': token
            },
            withCredentials: true
        })
            .then(response => {
                dispatch(fetchUserSucess(response.data))
                navigate('/')
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    dispatch(fetchUserFailed(error.response.data.error))
                }
                else {
                    dispatch(fetchUserFailed("Something went wrong"))
                }
            });
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return <>
        <div className="login-details">
            <div className="login-header">
                <div className="login-header-1">Sign In</div>
                <div className="login-header-2">Sign into your Blog Page</div>
            </div>
            <form onSubmit={handleLoginSubmit}>
                <div className="login-input-1">
                    <label>Username</label>
                    <input placeholder="username" type="text" onChange={handleUsernameChange} value={username}></input>
                </div>
                <div className="login-input-2">
                    <label>Password</label>
                    <input placeholder="password" type="text" onChange={handlePasswordChange} value={password}></input>
                </div>
                <button className="welcome-blog-login" type="submit">Login</button>
            </form>
            <div className="login-footer">
                <div className="login-footer-1">Don't have an account</div>
                <div onClick={() => navigate('/register')} className="login-footer-2">Sign Up</div>
            </div>
        </div>
    </>
}

export default Login 
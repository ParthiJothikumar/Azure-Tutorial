import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import "./CreatePost.css"

const CreatePost = () => {
    const navigate = useNavigate()
    const { token } = useSelector(state => state.login)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [error, setError] = useState("")

    const handleCreatePost = async (e) => {
        e.preventDefault()
        const data = {
            title: title,
            content: content,
        }
        const body = {
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': token
            },
            withCredentials: true
        }
        await axios.post(`${import.meta.env.VITE_API_URL}/create`, data, body)
            .then(response => {
                navigate('/')
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

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleContentChange = (e) => {
        setContent(e.target.value)
    }

    return <>
        <div className="login-details">
            <div className="login-header">
                <div className="login-header-1">Create Blog</div>
                <div className="login-header-2">Create a new blog post</div>
            </div>
            <form onSubmit={handleCreatePost}>
                <div className="post-title">
                    <label>Title</label>
                    <input className="post-input" placeholder="title" type="text" onChange={handleTitleChange} value={title}></input>
                </div>
                <div className="post-content">
                    <label>Content</label>
                    <textarea className="post-textarea" placeholder="Type content here.." type="text" onChange={handleContentChange} value={content}></textarea>
                </div>
                {error ? <div style={{color:"red"}}>{error}
                </div> : <></>}
                <button className="welcome-blog-login" type="submit">Post</button>
            </form>
        </div>
    </>
}

export default CreatePost 
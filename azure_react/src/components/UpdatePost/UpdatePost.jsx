import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom";

const UpdatePost = () => {
    const navigate = useNavigate()
    const { token } = useSelector(state => state.login)
    const { blogUpdateData } = useSelector(state => state.blog)
    const [title, setTitle] = useState()
    const [content, setContent] = useState("")
    const [error, setError] = useState("")
    const [postId,setPostId] =  useState("")

    const handleCreatePost = async (e) => {
        e.preventDefault()
        const data = {
            title: title,
            content: content,
            id: postId
        }
        const body = {
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': token
            },
            withCredentials: true
        }
        await axios.post(`${import.meta.env.VITE_API_URL}/update`, data, body)
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

    useEffect(() => {
        if(blogUpdateData){
            setContent(blogUpdateData.content)
            setTitle(blogUpdateData.title)
            setPostId(blogUpdateData.id)
        }
    },[blogUpdateData])

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleContentChange = (e) => {
        setContent(e.target.value)
    }

    return <>
        <div className="login-details">
            <div className="login-header">
                <div className="login-header-1">Update Blog</div>
                <div className="login-header-2">Update an existing blog post</div>
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
                <button className="welcome-blog-login" type="submit">Update</button>
            </form>
        </div>
    </>
}

export default UpdatePost 
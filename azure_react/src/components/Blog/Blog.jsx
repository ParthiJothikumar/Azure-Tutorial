import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchBlogFailed, fetchBlogStart, fetchBlogSucess, fetchBlogUpdateData } from "../../redux/features/blog/blogSlice";
import axios from "axios"
import "./Blog.css"
import { useNavigate } from "react-router-dom";

const Blog = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { post, loading } = useSelector(state => state.blog)
    const { isAuthenticated, token } = useSelector(state => state.login)

    useEffect(() => {
        const body = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        }
        try {
            const fetchBlogData = async () => {
                await axios.get(`${import.meta.env.VITE_API_URL}/blog`, body)
                    .then(response => {
                        dispatch(fetchBlogSucess(response.data))
                    })
                    .catch(error => {
                        if (error.status == 403) {
                            dispatch(fetchBlogFailed(error.status))
                            console.error('User Not logged in');
                        }
                        else {
                            dispatch(fetchBlogFailed(error.status))
                            console.error('Something Went Wrong', error);
                        }
                    });
            }
            dispatch(fetchBlogStart())
            fetchBlogData()
        }
        catch (error) {
            dispatch(fetchBlogFailed(300))
        }

    }, [])

    const handleLogin = () => {
        dispatch(fetchBlogSucess([]))
        navigate('/login')
    }

    const handlePostUpdate = (res) => {
        dispatch(fetchBlogUpdateData(res))
        navigate('/update')
    }

    const handlePostDelete = (res) => {
        if (res && res.id) {
            const data = {
                id: res.id
            }
            const body = {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    'X-CSRFToken': token
                }
            }
            try {
                const deletePostData = async () => {
                    await axios.post(`${import.meta.env.VITE_API_URL}/delete`, data, body)
                        .then(response => {
                            window.location.reload()
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
                deletePostData()
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    return <>
        <div className="Blog-Details">
            {isAuthenticated ? loading ? <div>
                <div>Loading...</div>
            </div> : post.length > 0 ? post.map(res => (
                <div className="Blog-Flex">
                    <div className="Blog-Title">{res.title}</div>
                    <div className="Blog-Content">{res.content}</div>
                    <div className="blog-footer">
                        <div className="Blog-Date">{res.date}</div>
                        <div className="blog-footer-right">
                            <div onClick={() => handlePostUpdate(res)} className="blog-update">Update</div>
                            <div onClick={() => handlePostDelete(res)} className="blog-delete">Delete</div>
                        </div>
                    </div>
                </div>
            )) : <div>
                <div>You don't have any blog Post</div>
            </div> : <div className="welcome-blog">
                <div className="welcome-blog-heading">Welcome to the Blog Page</div>
                <div className="welcome-blog-summary">This A Blog Application allows users to create, read, update, and delete (CRUD) blog posts, optionally with features like authentication</div>
                <div className="welcome-blog-login" onClick={handleLogin}>Login</div>
            </div>}
        </div>
    </>
}

export default Blog 
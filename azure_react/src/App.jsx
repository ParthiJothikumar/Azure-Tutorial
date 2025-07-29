import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Cookies from 'js-cookie';
import Blog from './components/Blog/Blog'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import axios from 'axios'
import { getCSRFToken } from './utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTokenSucess, fetchTokenFailed, fetchLogoutSucess } from "../src/redux/features/Login/loginSlice";
import Navbar from './utils/Navbar'
import CreatePost from './components/CreatePost/CreatePost'
import UpdatePost from './components/UpdatePost/UpdatePost'

function App() {
  const dispatch = useDispatch()
  const { token, isAuthenticated } = useSelector(state => state.login)

  useEffect(() => {
    try {
      console.log(import.meta.env.VITE_API_URL);
      
      const fetchCsrfToken = async () => {
        // The withCredentials: true option instructs the browser to send cookies and 
        // authentication headers along with the request — even for cross-origin requests.
        await axios.get(`${import.meta.env.VITE_API_URL}/api/csrf/`, { withCredentials: true })
          .then(response => {
            if (response.data && response.data.success == "cookie set") {
              dispatch(fetchTokenSucess(getCSRFToken()))
            }
            else {
              dispatch(fetchTokenFailed("Something went wrong"))
            }
          })
          .catch((error) => {
            dispatch(fetchTokenFailed("Something went wrong"))
          })
      }
      fetchCsrfToken()
    }
    catch (error) {
      dispatch(fetchTokenFailed("Something went wrong"))
    }
  }, [isAuthenticated])



  return (
    <>
      <div>
        <div>
          <div>

          </div>
        </div>
        <Router>
          <Navbar isAuthenticated={isAuthenticated} />
          <Routes>
            <Route path='/' element={<Blog />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/create' element={<CreatePost />}></Route>
            <Route path='/update' element={<UpdatePost />}></Route>
            <Route path='/register' element={<Register />}></Route>
          </Routes>
        </Router>

      </div>
    </>
  )
}

export default App

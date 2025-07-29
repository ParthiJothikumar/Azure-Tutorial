import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLogoutFailed, fetchLogoutSucess } from '../redux/features/Login/loginSlice';
import { fetchBlogSucess } from '../redux/features/blog/blogSlice';

const Navbar = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, isAuthenticated } = useSelector(state => state.login)

  const styles = {
    nav: {
      backgroundColor: '#333',
      padding: '10px',
      display: 'flex',
      justifyContent: 'center',
      gap: '20%'
    },
    link: {
      color: '#fff',
      marginRight: '10px',
      textDecoration: 'none',
    },
    button: {
      backgroundColor: '#f00',
      color: '#fff',
      border: 'none',
      padding: '5px 10px',
      cursor: 'pointer',
    }
  };

  const handleLogout = async () => {
    try {
      console.log(token);

      const body = {
        withCredentials: true,
        headers: {
          'Content-Type': "application/json",
          'X-CSRFToken': token
        }
      }
      await axios.post(`${import.meta.env.VITE_API_URL}/logout/`, {}, body)
        .then(res => {
          dispatch(fetchLogoutSucess())
          dispatch(fetchBlogSucess([]))
          navigate('/')
        })
        .catch(error => {
          dispatch(fetchLogoutFailed(error.message))
        })
    }
    catch (error) {
      dispatch(fetchLogoutFailed(error.message))
    }
  }

  return (
    <nav style={styles.nav}>

      {props.isAuthenticated ? (
        <>
          <Link to="/" style={styles.link}>Blog</Link>
          <Link to="/create" style={styles.link}>Create</Link>
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/" style={styles.link}>Blog</Link>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/register" style={styles.link}>Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar
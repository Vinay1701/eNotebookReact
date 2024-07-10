import React, { useContext } from 'react'
import * as PropTypes from 'prop-types'
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AlertContext from '../context/Alerts/AlertContext'

export default function Navbar(props) {
  let location = useLocation();

  // useEffect Hook that is dependent on a variable. If the "location" variable updates, the effect will run again
  // It is used to render a change
  // useEffect(() => { 
  //   console.log(location.pathname)
  // }, [location]);

  const {showAlert} = useContext(AlertContext)
  const navigate = useNavigate()
  const handleLogOut = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('name')
    showAlert("Log Out Successful!", "success")
    navigate('/home')
  }

  const host = "http://localhost:5000/"
  if(localStorage.getItem('authToken')) {
    const getUserName = async () => {
      const url = `${host}api/auth/getuser`
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken')
        }
      });
      const user = await response.json()
      localStorage.setItem('name', user.name)
    }
    getUserName()
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
      <Link className="navbar-brand" to="/">
        <img src={require('../images/navlogo.png')} alt='eNoteBook' width={150} height={40} />
      </Link>
        {/* <Link className="navbar-brand" to="/">{props.title}</Link> */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? "active" : ""} `} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={` nav-link ${location.pathname === '/yourNotes' ? "active" : ""} `} to="/yourNotes">My Notes</Link>
            </li>
            <li className="nav-item">
              <Link className={` nav-link ${location.pathname === '/about' ? "active" : ""} `} to="/about">About us</Link>
            </li>
          </ul>
        </div>
        {
          !localStorage.getItem('authToken') ? 
          <ul className='navbar-nav'>
            <li className="nav-item">
              <Link type="button" className="btn btn-outline-success mx-1" to="/signin">Sign In</Link>
            </li>
            <li className="nav-item">
              <Link type="button" className="btn btn-outline-success mx-1" to="/signup">Sign Up</Link>
            </li>
          </ul>
          :
          <ul className='navbar-nav'>
            <li className="nav-item">
              <span className='nav-link active align-self-center'>User: {localStorage.getItem('name')} </span>
            </li>
            <li className="nav-item">
              <button type="button" className="btn btn-outline-success mx-2" onClick={handleLogOut}>Log Out</button>
            </li>
          </ul>
        }
      </div>
    </nav>
  )
}

Navbar.prototypes = {
  title: PropTypes.string.isRequired
}

Navbar.defaultProps = {
  title: "Set title here"
}
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../context/Alerts/AlertContext'


export default function Signup() {

  const host = "http://localhost:5000/"

    const navigate = useNavigate()

    const {showAlert} = useContext(AlertContext)

    const [credentails, setCredentials] = useState( {name: "", email: "", password: ""} )
    
    const onChange = (event) => { // Keeping other key values unchanged, only changing the key values of the event fired input name
        setCredentials( {...credentails, [event.target.name]: event.target.value} ) 
        // So what "[event.target.name]: event.target.value" this means is setting email: input, password: input of the credentials
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault()
        const url = `${host}api/auth/createUser`
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify( {name: credentails.name, email: credentails.email, password: credentails.password} )
        });
        const json = await response.json()
        if(json.success) {
            localStorage.setItem("authToken", json.authToken)
            showAlert("Sign Up Successful!", "success")
            navigate("/yourNotes")
        }
        else showAlert("This email already exists", "danger")
    }

  return (
    <div >
      <h3 className='text-center'>Sign Up</h3>
      <form onSubmit={handleOnSubmit}> 
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" value={credentails.name} onChange={onChange} minLength={3} required />
          </div>
          <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" name="email" value={credentails.email} onChange={onChange} required />
          </div>
          <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" autoComplete='on' className="form-control" id="password" name="password" value={credentails.password} onChange={onChange} minLength={5} required />
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
    </div>
  )
}

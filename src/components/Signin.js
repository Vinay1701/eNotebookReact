import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../context/Alerts/AlertContext'

export default function Signin() {

    const host = "http://localhost:5000/"

    const {showAlert} = useContext(AlertContext)

    const navigate = useNavigate()

    const [credentails, setCredentials] = useState( {email: "", password: ""} )
    
    const onChange = (event) => { // Keeping other key values unchanged, only changing the key values of the event fired input name
        setCredentials( {...credentails, [event.target.name]: event.target.value} ) 
        // So what "[event.target.name]: event.target.value" this means is setting email: input, password: input of the credentials
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault()
        const url = `${host}api/auth/login`
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {email: credentails.email, password: credentails.password} )
        });
        const json = await response.json()
        if(json.success) {
            localStorage.setItem("authToken", json.authToken)
            showAlert("Sign In Sucessful!", "success")
            navigate("/yourNotes")
        }
        else showAlert("Invalid Credentials", "danger")
    }

    return (
    <div>
        <h3 className='text-center'>Sign In</h3>
        <form onSubmit={handleOnSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" value={credentails.email} onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" autoComplete='on' className="form-control" id="password" name="password" value={credentails.password} onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
    </div>
    )
}

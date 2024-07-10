const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')


const JWT_SEC = 'Pranav$yo'

// NOTE: User sent info will be in "req", and the server sent info will be sent using "res"

// Creating a user end-point "/api/auth/createuser" 
router.post('/createuser', [
    body('name', 'Name must be atleast 3 charecters long').isLength({min: 3}),
    body('email', 'Email must be valid').isEmail(),
    body('password', 'Password must be atleast 5 charecters long').isLength({min: 5})
], async (req, res) => {
    let success = false

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        // As js skips the time taking process and goes to below code without blocking this line will not perform as expected.
        // So to resolve this issue we need to make it "await" and block the below code until its exec
        let isEmailExists = await User.findOne({ email: req.body.email }) 
        if(isEmailExists) {
            return res.status(400).json({ success, error: "This email already exists" })
        }
        let salt = bcrypt.genSaltSync();
        let hashedPass = bcrypt.hashSync(req.body.password, salt)

        // Creating a new user, using "await" until it is created successfully then sending a response
        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
            // password: req.body.password
        })

        const data = {
            user: {
                id: user.id
            }
        }
        
        const authToken = jwt.sign(data, JWT_SEC)

        // res.json(user)
        success = true
        res.json({ success, authToken })
    }
    catch(err) {
        console.log(err.message)
        res.status(500).send("Some error has occured")
    }
    
})

// Authenticating a user at end-point "/api/auth/login"
router.post('/login', [
    body('email', 'Email must be valid').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {

    const errors = validationResult(req)

    let success = false
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body

    try {
        // Get a user-details with the particular email
        let user = await User.findOne({ email: req.body.email }) 
        if(!user) {
            return res.status(400).json({ success, error: "Accout does not exist" })
        }

        const comparePass = bcrypt.compareSync(password, user.password)
        if(!comparePass) {
            return res.status(400).json({ success, error: "Incorrect Password" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        
        const authToken = jwt.sign(data, JWT_SEC)
        success = true
        // res.json(user)
        res.json({ success, authToken })

    } catch (err) {
        console.log(err.message)
        res.status(500).send("Internal server error")
    }
})

// Getting the loggedin user details at end-point "/api/auth/getuser" using fetchuser as middleware
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        // After the fetch user has executed this part will execute
        
        // We have appended the user info in "req.user" from the fetchuser middleware 
        let userid = req.user.id
        const user = await User.findById(userid).select('-password')
        res.send(user)

    } catch (err) {
        console.log(err.message)
        res.status(500).send("Internal server error")
    }
})

module.exports = router
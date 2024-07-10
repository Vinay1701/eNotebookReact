const jwt = require('jsonwebtoken')
const JWT_SEC = 'Pranav$yo'

const fetchuser = (req, res, next) => {
    try {
        // Get token from the jwt and add id to req obj
        const token = req.header('auth-token')
        if(!token) {
            res.status(401).send({error: "Please login using valid token"})
        }
        const database = jwt.verify(token, JWT_SEC)
        if(!database) {
            res.status(401).send({error: "Please login using valid token"})
        }

        req.user = database.user
        next();
    }
    catch(err) {
        console.log(err.message)
        res.status(400).send({error: "Please login using valid token,,"})
    }
}

module.exports = fetchuser
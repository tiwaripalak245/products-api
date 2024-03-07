const jwt = require('jsonwebtoken')
const Auth = require('../models/authModel')
require('dotenv').config()

const verifyToken = async(req, res, next) => {
    
    const {authorization} = req.headers

    if(authorization && authorization.startsWith("Bearer")){
        const token = authorization.split(" ")[1]
        const {id} = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(id)
        req.user = await UserData.findById(id).select('-password')
        next()
    } else {
        res.send({message : "Unauthorized user!!"})
    }
}

module.exports = verifyToken;
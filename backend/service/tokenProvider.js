const jwt = require('jsonwebtoken')
require('dotenv').config()

const createToken = (user) => {
const secretkey = process.env.JWT_SECRET_KEY

const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    
}

const token = jwt.sign(payload, secretkey, {expiresIn: "28d"})
console.log(token)
return token;

}
module.exports = createToken;

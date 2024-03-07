const mongoose = require('mongoose')
const {Schema} = require('mongoose')


const authSchema = new Schema
({
name: {
    type: String,
    required: true,
    trim: true
},

email: {
    type: String,
    unique: true,
    required: true,
    trim: true
},
password: {
    type: String,
    required: true,
    trim: true
},

},
{
    timestamps: true
})

const Auth = mongoose.model('Auth', authSchema)
module.exports = Auth
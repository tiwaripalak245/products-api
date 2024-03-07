const mongoose = require('mongoose')

const connectDB = async() => {
    try {
 const conn = await mongoose.connect(process.env.MONGO_URI)
 console.log(`DB Connection Successful ${conn.connection.host}`)
    } catch (error) {
      console.log("DB Connection failed!!")  
    }
}

module.exports = connectDB
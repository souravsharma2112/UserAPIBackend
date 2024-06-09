const mongoose = require("mongoose")
const URI = process.env.DB_URI

const connectDB = async () =>{
    try {
        await mongoose.connect(URI)
        console.log("Databases connected Successfully");
    } catch (error) {
        console.log("Database not Connected");
        process.exit(0)
    }
}

module.exports = connectDB
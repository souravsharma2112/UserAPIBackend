require("dotenv").config();
const express = require('express')
const cors = require('cors')
const app = express();
const router = require("./router/auth-router")
const connectDB = require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");
// const clientURL = "http://localhost:5173/"
// const clientURL = "https://usermsapi.netlify.app"

const corsOptions = {
    origin: "https://usermsapi.netlify.app",
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));


app.use(express.json())
app.use("/api/auth" , router)

app.use(errorMiddleware)
connectDB().then(()=>{
    app.listen(process.env.PORT || 5000 , ()=>{
        console.log("Server is running");
    })
})

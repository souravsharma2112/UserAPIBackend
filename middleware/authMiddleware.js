const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req , res , next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res
        .status(400)
        .json({"msg" : "Unauthorized Http"})
    }
    
    const jwtToken = token.replace("Bearer","").trim()
    // console.log("token from auth middleware" , jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken , process.env.JWT_SECRET_KEY)
        // console.log(isVerified);
        const userDetails = await User.findOne({ email: isVerified.email}).select({
            password : 0
        })
        // console.log(userDetails);

        req.user = userDetails
        req.token = token
        req.userID = userDetails._id

        next()
    } catch (error) {
        return res.status(401).json({message : "Unauthorized : Invalid token"})
    }

    next()
}

module.exports = authMiddleware
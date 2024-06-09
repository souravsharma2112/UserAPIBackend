const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    fname : {
        type : String,
        require : true
    },
    lname : {
        type : String,
        require : true
    },
    username : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    phone : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    }
})

// compare password instance method

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password , this.password)
}


// jwt
userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userID : this._id.toString(),
            email : this.email,
            isAdmin : this.isAdmin
        },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn : "30d",
    }
    )
    } catch (error) {
        console.error(error);
    }
}



const User = new mongoose.model("Registerdata" , userSchema)

module.exports = User
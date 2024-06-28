const User = require("../models/user-model")
const bcrypt = require("bcryptjs")


const Home = async (req, res) => {
    try {
        res.status(200);
        res.send("SAdsad");

    } catch (error) {
        console.log(error);
    }
}



const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userExist = await User.findOne({ email });
        console.log(userExist);
        if (!userExist) {
            return res.status(400).json({ msg: "invalid Creditionals" })
        }
        const checkPass = await userExist.comparePassword(password)
        if (checkPass) {
            res.status(200).json({
                msg: "Login Successful",
                token: await userExist.generateToken(),
                userID: userExist._id.toString()
            })
        }
        else {
            res.status(401).json({ msg: "invalid email or password" })
        }
    } catch (error) {
        res.status(500).json("internal serverxxvcx error")
    }
}


const Register = async (req, res, next) => {
    try {
        console.log(req.body);
        const { fname, lname, username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(400).json({ msg: "Email Exist Already" })
        }

        const saltRound = 10;
        const hash_password = await bcrypt.hash(password, saltRound)

        const userCreated = await User.create({ fname, lname, username, email, phone, password: hash_password })

        res.status(201);
        res.json({ msg: "Registration Successfully", token: await userCreated.generateToken(), userID: userCreated._id.toString() })
    } catch (error) {
        console.log(error)
    }
}

const UserData = async (req, res) => {
    try {
        const userDetails = req.user
        console.log(userDetails);
        return res.status(200).json({ userDetails })
    } catch (error) {
        console.log("error from the user route");
    }
}

const UpdateUserData = async (req, res) => {

    try {
        const updateObject = req.body;
        const updateData = await User.updateOne(
            {
                email: updateObject.email
            },
            {
                $set: updateObject
            }
        )
        return res.status(200).json(updateData)
    } catch (error) {
        next(error)
        console.log("SAdasd");
    }
};

// Update Password

const UpdateUserPass = async (req, res, next) => {
    try {
        let updateObject = req.body;
        const saltRound = 10;
        const hash_password = await bcrypt.hash(updateObject.password, saltRound)
        updateObject.password = hash_password
        delete updateObject.oldpass
        console.log(updateObject);
        const updateData = await User.updateOne(
            {
                email: updateObject.email
            },
            {
                $set: updateObject
            }
        )
        return res.status(200).json(updateData)
    } catch (error) {
        next(error)
    }
}

// const Login = async (req, res) => {
//     try {
//         const { email, password } = req.body
//         const userExist = await User.findOne({ email });
//         console.log(userExist);
//         if (!userExist) {
//             return res.status(400).json({ msg: "invalid Creditionals" })
//         }
//         const checkPass = await userExist.comparePassword(password)
//         if (checkPass) {
//             res.status(200).json({
//                 msg: "Login Successful",
//                 token: await userExist.generateToken(),
//                 userID: userExist._id.toString()
//             })
//         }
//         else {
//             res.status(401).json({ msg: "invalid email or password" })
//         }
//     } catch (error) {
//         res.status(500).json("internal serverxxvcx error")
//     }
// }

module.exports = { Home, Login, Register, UserData, UpdateUserData, UpdateUserPass }
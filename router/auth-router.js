const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth-controller")
const {signupSchema , loginSchema} = require("../validators/auth-validators")

const validate = require("../middleware/validater-middleware")
const authMiddleware = require("../middleware/authMiddleware")

router.route("/").get(authController.Home)
router.route("/register").post(validate(signupSchema) ,authController.Register)
router.route("/login").post(validate(loginSchema) , authController.Login)
router.route("/update").patch( authController.UpdateUserData)
router.route("/passupdate").patch( authController.UpdateUserPass)

router.route("/user").get(authMiddleware ,authController.UserData)

module.exports = router;
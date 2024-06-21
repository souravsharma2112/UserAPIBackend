const { z } = require("zod")


const loginSchema = z.object({
    email : z
    .string({ required_error : "Email is Required."})
    .trim()
    .email({ message : "Invalid email address"})
    .min(3 , {message : "Email must be atleast of 3 characters"})
    .max(255 , { message : "Email must not be more than 255 characters"}),
    password : z
    .string({ required_error : "password is Required."})
    .trim()
    .min(7 , {message : "password must be atleast of 7 character"})
    .max(255 , { message : "phone must not be more than 255 character"})
})


const signupSchema = loginSchema.extend({
    fname : z
    .string({required_error : "First Name Required"})
    .trim()
    .min(3 , { message : "Name must be atleast 3 char."})
    .max(255 , { message : "Name must not be more than 255 character"}),
    lname : z
    .string({required_error : "Last Name Required"})
    .trim()
    .min(3 , { message : "Name must be atleast 3 char."})
    .max(255 , { message : "Name must not be more than 255 character"}),
    username : z
    .string({required_error : "username Required"})
    .trim()
    .min(3 , { message : "username must be atleast 3 char."})
    .max(255 , { message : "username must not be more than 255 character"}),
    phone : z
    .string({ required_error : "phone is Required."})
    .trim()
    .min(10 , {message : "phone must be of 10 digit"})
    .max(20 , { message : "phone must not be more than 10 digit"}),
})



module.exports = {signupSchema , loginSchema};
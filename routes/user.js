import express from "express";
import User from "../models/user.js"
// import _ from 'lodash';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import checkauth from "../middleware/auth.js";
import adminauth from "../middleware/admin.js";
const userrouter = express.Router()

// //BCRYPT PASSWORD USE THIS METHOD START
// const secure = async (password) => {

//   try {
//     const passwordhash = await bcrypt.hash(password, 10)
//     return passwordhash

//   } catch (error) {
//     res.status(400).send({ message: "error" })
//   }
// }
// //BCRYPT PASSWORD USE THIS METHOD END



// userrouter.get("/profile", checkauth, async (req, res) => {

//   const profile = await User.findById(req.user._id).select('-password')// chye to employ wali details find krwao
//   res.send(profile)
// })

// userrouter.post("/register", async (req, res) => {

//   const { name, email, password, cpassword } = req.body

//   if (!name || !email || !password || !cpassword) {

//     return res.status(422).send({ error: "plz fill the field properly" })
//   }
//   else {

//     const spassword = await secure(req.body.password)

//     const user = new User({
//       name, email,
//       password: spassword,
//       cpassword: spassword,
// })

//     const userdata = await User.findOne({ email: req.body.email })

//     if (userdata) {

//       res.status(400).send({ message: "user already exist" })

//     } else if (password != cpassword) {

//       return res.status(422).send({ error: "password are not match" })
//     }
//     else {

//       await user.save()

//       const token = user.generateTokens()

//       res.status(200).send({ message: "welcome....successful register" })
//     }
//   }
// });

export default userrouter


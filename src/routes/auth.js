const express = require("express")
const authRouter = express.Router()
const User = require('../models/user')
const {validateSignUpData} = require('../utils/validation')
const bcrypt = require('bcrypt')

authRouter.post('/signup', async (req, res) => {
  const {firstName, lastName, emailId, password, gender, skills} = req.body

  try {
    // Validate the data
    validateSignUpData(req)

    // Hash a password
    const hashPassword = await bcrypt.hash(password, 10)

    // Create a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      gender,
      skills,
      password: hashPassword
    })
    await user.save()
    res.send("User created successfully")
  } catch (err) {
    res.status(400).send("Error saving the user: "+err.message)
  }
})

authRouter.post('/login', async (req, res) => {
  const {emailId, password} = req.body

  try {
    // Validate the email first
    const user = await User.findOne({emailId})

    if(!user) {
      throw new Error('Invalid credentials!')
    }

    isPasswordCorrect = await user.validatePassword(password)

    if(isPasswordCorrect) {
      // Create a JWT token
      const token = await user.getJWT()

      // Adda token to cookie and send response back to user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 3600000)
      })
      res.send("Login successfull!")
    } else {
      throw new Error("Invalid credentials!")
    }
  } catch (err) {
    res.status(400).send("Error while logging user in: "+err.message)
  }
})

module.exports = authRouter
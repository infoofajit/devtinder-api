const express = require("express")
const profileRouter = express.Router()
const {userAuth} = require('../middlewares/auth')
const User = require("../models/user")
const {validateEditProfileData} = require('../utils/validation')

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user
    if(!user) {
      throw new Error("User does not exist")
    }
    
    res.send(user)
  } catch (err) {
    res.status(400).send("User is unauthenticated")
  }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if(!validateEditProfileData) {
      throw new Error("Invalid edit request")
    }

    const loggedInUser = req.user
    // const user = await User.findByIdAndUpdate(loggedInUser?._id, req.body)
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))
    await loggedInUser.save()
    res.json({
      message: "Profile updated successfully",
      data: loggedInUser
    })
  } catch(err) {
    console.log(err);
    res.status(400).send("User is unauthenticated")
  }
})

module.exports = profileRouter
const express = require("express")
const profileRouter = express.Router()
const {userAuth} = require('../middlewares/auth')

profileRouter.get("/profile", userAuth, async (req, res) => {
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

module.exports = profileRouter
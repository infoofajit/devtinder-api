const express = require("express")
const requestRouter = express.Router()
const {userAuth} = require('../middlewares/auth')

requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    const user = res.user
    res.send(user.firstName + " sent the connection request!")
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = requestRouter
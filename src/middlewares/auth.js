const jwt = require("jsonwebtoken")
const User = require("../models/user")

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies
    const {token} = cookies

    if(!token) {
      throw new Error("Invalid token!")
    }

    // Validate my token
    const decodedMsg = await jwt.verify(token, "Cookie@123")
    const {_id} = decodedMsg

    const user = await User.findOne({_id: _id})
    if(!user) {
      throw new Error("User does not exist")
    }

    res.user = user
    next()
  } catch (err) {
    res.status(400).send("ERROR: " + err)
  }
}

module.exports = {
  userAuth
}
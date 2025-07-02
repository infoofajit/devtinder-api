const express = require("express")
const { userAuth } = require("../middlewares/auth")
const ConnectionRequestModal = require("../models/connectionRequest")
const userRouter = express.Router()

const USER_SAFE_DATA = "firstName lastName"

// Get all the pending connection request for the loggedin user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user

    const connectionRequest = await ConnectionRequestModal.find({
      toUserId: loggedInUser._id,
      status: 'interested'
    }).populate("fromUserId", ['firstName', 'lastName'])

    res.json({
      message: "Data fetched successfully!",
      data: connectionRequest
    })
  } catch (err) {
    res.send(400).json({
      message: err.message
    })
  }
})

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user

    const connection = await ConnectionRequestModal.find({
      $or: [
        {toUserId: loggedInUser._id, status: 'accepted'},
        {fromUserId: loggedInUser._id, status: 'accepted'}
      ]
    })
    .populate("fromUserId", USER_SAFE_DATA)
    .populate("toUserId", USER_SAFE_DATA)

    const data = connection.map((row) => {
      if(row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId
      }
      return row.fromUserId
    })

    res.json({
      message: "List",
      data: data
    })
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
})

module.exports = userRouter
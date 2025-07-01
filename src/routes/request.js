const express = require("express")
const requestRouter = express.Router()
const {userAuth} = require('../middlewares/auth')
const ConnectionRequestModal = require("../models/connectionRequest")
const User = require("../models/user")

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const toUserId = req.params?.toUserId
    const fromUserId = res.user._id
    const status = req.params?.status

    const allowedStatus = ["interested", "ignored"]
    if(!allowedStatus.includes(status)) {
      throw new Error("Invalid status type " + status)
    }

    // Check if user exist to whom request needs to send
    const toUser = await User.findById(toUserId)
    if(!toUser) {
      throw new Error("User not found!")
    }

    // Check if there i an existing connection requesr a-b/b-a
    const isExistingConnectionRequest = await ConnectionRequestModal.findOne({
      $or: [
        {fromUserId, toUserId},
        {fromUserId: toUserId, toUserId: fromUserId},
      ]
    })

    if(isExistingConnectionRequest) {
      throw new Error("Request already exist")
    }

    const connectionRequest = new ConnectionRequestModal({
      toUserId, fromUserId, status
    })

    const data = await connectionRequest.save()
    res.json({
      message: "Connection request send successfully",
      data: data
    })
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
})

module.exports = requestRouter
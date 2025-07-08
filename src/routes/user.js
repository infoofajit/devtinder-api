const express = require("express")
const { userAuth } = require("../middlewares/auth")
const ConnectionRequestModal = require("../models/connectionRequest")
const User = require("../models/user")
const userRouter = express.Router()

const USER_SAFE_DATA = "firstName lastName gender about avatar skills"

// Get all the pending connection request for the loggedin user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user

    const connectionRequest = await ConnectionRequestModal.find({
      toUserId: loggedInUser._id,
      status: 'interested'
    }).populate("fromUserId", USER_SAFE_DATA)

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

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user
    const page = parseInt(req?.query?.page) || 1
    let limit = parseInt(req?.query?.limit) || 10
    limit = limit > 50 ? 50 : limit
    const skip = (page - 1) * limit

    // Find all connection that I have send/received
    const connectionRequest = await ConnectionRequestModal.find({
      $or: [
        {fromUserId: loggedInUser._id},
        {toUserId: loggedInUser._id},
      ]
    }).select(['fromUserId', 'toUserId'])

    const hideUsersFromFeed = new Set()
    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId)
      hideUsersFromFeed.add(req.toUserId)
    })

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } }
      ]
    }).select(USER_SAFE_DATA).skip(skip).limit(limit)

    res.json({
      users: users,
      page,
      limit,
      skip,
    })
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
})

module.exports = userRouter
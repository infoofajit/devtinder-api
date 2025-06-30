const express = require("express")
const userRouter = express.Router()
const User = require('../models/user')

// Feed API to get all the users from the DB
userRouter.get('/feed', async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

userRouter.get('/getUserByEmail', async (req, res) => {
  // try {
  //   const users = await User.find({emailId: req.body.email})

  //   if(users.length) {
  //     res.send(users)
  //   } else {
  //     res.status(400).send("No user found!")
  //   }
  // } catch (err) {
  //   res.status(400).send(err.message)
  // }

  try {
    const user = await User.findOne({emailId: req.body.email})
    res.send(user)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

userRouter.delete('/user', async (req, res) => {
  const userId = req.body.id

  try {
    await User.findByIdAndDelete(userId)
    res.send("User deleted successfully")
  } catch (err) {
    res.status(400).send(err.message)
  }
})

userRouter.patch('/user/:id', async (req, res) => {
  const id = req.params?.id
  const data = req.body

  const ALLOWED_UPDATE_FIELD = ['firstName', 'lastName', 'age', 'gender', 'avatar', 'skills']

  try {
    const isAllowedUpdate = Object.keys(data).every((key) => ALLOWED_UPDATE_FIELD.includes(key))

    if(!isAllowedUpdate) {
      throw new Error('Following fields can only be updated: firstName, lastName, age, gender, avatar, skills')
    }

    const user = await User.findByIdAndUpdate(id, req.body, { runValidators: true })

    if(!user) {
      throw new Error('User not found!')
    }
    res.send("User updated successfully!"+user)
  } catch (err) {
    res.status(400).send("Error while updating the user: "+err.message)
  }
})

module.exports = userRouter
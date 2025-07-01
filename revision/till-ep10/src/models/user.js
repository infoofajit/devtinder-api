const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  emailId: {
    type: String, required: true, unique: true,
    validate (val) {
      return validator.isEmail(val)
    }
  },
  password: {type: String, required: true},
  gender: {type: String, required: true},
  age: {type: Number, min: 18, max: 45},
  about: {type: String, default: "This is a default about of the user"},
  avatar: {type: String, default: "https://i.pravatar.cc/150?img=2"},
  skills: {type: [String], default: ["acting", "drama", "javascript"]},
}, {timestamps: true})

userSchema.methods.getJWT = async function() {
  const user = this
  const token = await jwt.sign({_id: user._id}, 'test@123', {
    expiresIn: '1d'
  })

  return token
}

userSchema.method.validatePassword = async function(password) {
  const user = this
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  return isPasswordCorrect
}

module.exports = mongoose.model("User", userSchema)
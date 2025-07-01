const mongoose = require('mongoose')
var validator = require('validator')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const { Schema } = mongoose

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 15
  },
  lastName: {
    type: String
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate (value) {
      return validator.isEmail(value)
    }
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: 18,
    max: 40
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message: `{VALUE} is incorrect`
    }
  },
  about: {
    type: String,
    default: "This is a default about of the user",
  },
  avatar: {
    type: String,
    default: "https://i.pravatar.cc/150?img=2",
    validate (value) {
      if(!validator.isURL(value)) {
        throw new Error("Invalid URL")
      }
    }
  },
  skills: {
    type: [String],
    validate (value) {
      if(value.length > 5) {
        throw new Error("Skill should not be more than 5!")
      }
    }
  }
}, {timestamps: true})

// Compound index
// User.find({firstName: 'Ajit', lastName: 'Singh'})
userSchema.index({firstName: 1, lastName: 1})

userSchema.methods.getJWT = async function() {
  const user = this

  const token = await jwt.sign({ _id: user._id }, "Cookie@123", {
    expiresIn: '1d'
  })

  return token
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
  const user = this
  const passwordHash = user.password

  const isPasswordCorrect = await bcrypt.compare(passwordInputByUser, passwordHash)
  return isPasswordCorrect
}

module.exports = mongoose.model('User', userSchema)
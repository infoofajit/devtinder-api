const mongoose = require('mongoose')
var validator = require('validator')
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
    validate (value) {
      if(!['male', 'female', 'others'].includes(value)) {
        throw new Error('Gender is not valid')
      }
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

module.exports = mongoose.model('User', userSchema)
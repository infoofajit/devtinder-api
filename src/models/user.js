const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 5
  },
  lastName: {
    type: String
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
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
    default: "This is a default about of the user"
  },
  skills: {
    type: [String]
  }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)
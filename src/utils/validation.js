const validator = require('validator')

const validateSignUpData = (req) => {
  const {firstName, lastName, emailId, password} = req.body

  if (!firstName || !lastName) {
    throw new Error('Name is not valid')
  } else if (!validator.isEmail(emailId)) {
    throw new Error('Email is not valid')
  } else if (!validator.isStrongPassword(password)) {
    throw new Error('Please enter strong password')
  }
}

const validateEditProfileData = (req) => {
  const allowedEditFields = ['firstName', 'lastName', 'age', 'gender', 'avatar', 'about']

  // Write logic to validate data coming from request
  if(!allowedEditFields) {
    return false
  }

  return true
}

module.exports = {
  validateSignUpData,
  validateEditProfileData
}
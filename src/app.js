const express = require('express');
const connectDB = require('./config/database')
const app = express();
const User = require('./models/user')
const {validateSignUpData} = require('./utils/validation')
const bcrypt = require('bcrypt')
const cookieParser = require("cookie-parser")
const {userAuth} = require('./middlewares/auth')

app.use(express.json())
app.use(cookieParser())

app.post('/signup', async (req, res) => {
  const {firstName, lastName, emailId, password, gender, skills} = req.body

  try {
    // Validate the data
    validateSignUpData(req)

    // Hash a password
    const hashPassword = await bcrypt.hash(password, 10)

    // Create a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      gender,
      skills,
      password: hashPassword
    })
    await user.save()
    res.send("User created successfully")
  } catch (err) {
    res.status(400).send("Error saving the user: "+err.message)
  }
})

app.post('/login', async (req, res) => {
  const {emailId, password} = req.body

  try {
    // Validate the email first
    const user = await User.findOne({emailId})

    if(!user) {
      throw new Error('Invalid credentials!')
    }

    isPasswordCorrect = await user.validatePassword(password)

    if(isPasswordCorrect) {
      // Create a JWT token
      const token = await user.getJWT()

      // Adda token to cookie and send response back to user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 3600000)
      })
      res.send("Login successfull!")
    } else {
      throw new Error("Invalid credentials!")
    }
  } catch (err) {
    res.status(400).send("Error while logging user in: "+err.message)
  }
})

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = res.user
    if(!user) {
      throw new Error("User does not exist")
    }
    
    res.send(res.user)
  } catch (err) {
    res.status(400).send("User is unauthenticated")
  }
})

app.post("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    const user = res.user
    res.send(user.firstName + " sent the connection request!")
  } catch (err) {
    res.status(400).send(err)
  }
})

// Feed API to get all the users from the DB
app.get('/feed', async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

app.get('/getUserByEmail', async (req, res) => {
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

app.delete('/user', async (req, res) => {
  const userId = req.body.id

  try {
    await User.findByIdAndDelete(userId)
    res.send("User deleted successfully")
  } catch (err) {
    res.status(400).send(err.message)
  }
})

app.patch('/user/:id', async (req, res) => {
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

connectDB()
  .then(() => {
    console.log('Database connected successfully!');
    app.listen(8000, () => {
      console.log("Server is successfully listening on port 8000");
    });
  })
  .catch((err) => {
    console.log('Something went wrong while connecting to database!', err);
  })
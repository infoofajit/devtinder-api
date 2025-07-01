const express = require("express")
const connectDB = require("./config/database")
const app = express()
const port = 8000
const {userAuth} = require("./middleware/auth")
const User = require("./models/user")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")

app.use(express.json())

app.post("/signup", async (req, res) => {
  const {firstName, lastName, emailId, password, gender, skills} = new User(req.body)
  const hashPassword = await bcrypt.hash(password, 10)

  const user = new User({
    firstName: firstName,
    lastName: lastName,
    emailId: emailId,
    password: hashPassword,
    gender: gender,
    skills: skills,
  })

  try {
    await user.save()
    res.send("User created successfully!")
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.message)
  }
})

app.post("/login", async (req, res) => {
  const {emailId, password} = req.body

  try {
    const user = await User.findOne({emailId: emailId})

    if(!user) {
      throw new Error("Incorrect login detail")
    }

    const isPasswordCorrect = await user.validatePassword(password)

    if(isPasswordCorrect) {
      const token = await user.getJWT()

      res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 3600000)
      })

      res.send("Loggedin successfully!"+token)
    } else {
      throw new Error("Incorrect login detail")
    }
  } catch (err) {
    res.status(400).send("Error while logging user in: " + err.message)
  }
})

connectDB()
  .then(() => {
      console.log("DB connected successfully!");
      app.listen(port, () => {
        console.log("Server is running on ", port);
      })
    })
    .catch((err) => {
      console.log("Something went wrong while connecting to DB: ", err?.message);
    })
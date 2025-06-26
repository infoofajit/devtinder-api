const express = require('express');
const connectDB = require('./config/database')
const app = express();
const User = require('./models/user')

app.post('/signup', async (req, res) => {
  // Create a new instance of the user model
  const user = new User({
    firstName: 'Ajit',
    lastName: 'Singh',
    emailId: 'ajit@gmail.com',
    password: 'test@123'
  })
  try {
    await user.save()
    res.send("User created successfully")
  } catch (err) {
    res.status(400).send("Something went wrong!", err)
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
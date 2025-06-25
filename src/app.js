const express = require('express');

const app = express();

const {adminAuth, userAuth} = require('./middlewares/auth')

// Handle auth middleware for all HTTP methods
app.use('/admin', adminAuth)

app.get('/admin/getUsers', (req, res) => {
  res.send('All users data sent!')
})

app.get('/admin/deleteUser', (req, res) => {
  res.send('Deleted a user!')
})

app.get('/user/login', (req, res) => {
  res.send('Logging user in!')
})

app.get('/user', userAuth, (req, res) => {
  res.send('Get a user!')
})

app.listen(8000, () => {
  console.log("Server is successfully listening on port 8000");
});
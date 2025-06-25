const express = require('express');

const app = express();

// This will only handle get calls to /user
app.get('/user', (req, res) => {
  res.send({ firstname: 'Ajit', lastname: 'Singh' })
})

app.post('/user', (req, res) => {
  // Saving data to DB
  res.send("Data saved successfully to the DB!")
})

app.delete('/user', (req, res) => {
  res.send("Deleted successfully!")
})

// This route will match all HTTP methods API calls to /test
app.use('/test', (req, res) => {
  res.send('Test hello from the server!')
})

app.listen(8000, () => {
  console.log("Server is successfully listening on port 8000");
});
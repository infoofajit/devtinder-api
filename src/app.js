const express = require('express');

const app = express();

app.get('/getUserData', (req, res) => {
  // try {
    throw new Error('Some db error')
    res.send('User data send!')
  // } catch (err) {
  //   res.status(500).send('Something went wrong!')
  // }
})

app.use('/', (err, req, res, next) => {
  if (err) {
    res.status(500).send('Something went wrong!')
  }
})

app.listen(8000, () => {
  console.log("Server is successfully listening on port 8000");
});
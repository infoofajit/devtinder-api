const express = require('express');

const app = express();

app.use('/test', (req, res) => {
  res.send('Hey from test route!')
})

app.use('/secret', (req, res) => {
  res.send('Hey! There is no secret')
})

app.use('/', (req, res) => {
  res.send('Hey from Dashboard!')
})

app.listen(8000, () => {
  console.log("Server is successfully listening on port 8000");
});
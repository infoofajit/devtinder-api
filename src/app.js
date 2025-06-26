const express = require('express');
require('./config/database')
const app = express();

app.listen(8000, () => {
  console.log("Server is successfully listening on port 8000");
});
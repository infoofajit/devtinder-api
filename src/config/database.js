const mongoose = require('mongoose')

async function connect() {
  await mongoose.connect('mongodb+srv://infoofajit:lADXpqGnawEvbmvk@nodelab.u8cm8e7.mongodb.net/')
}

connect()
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((err) => {
    console.log('Something went wrong while connecting to database!', err);
  })
const mongoose = require("mongoose")

const DB_USERNAME = 'infoofajit'
const DB_PASSWORD = 'lADXpqGnawEvbmvk'
const DB_NAME = 'NodeLab_db'

const connectDB = async function connect() {
  await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@nodelab.u8cm8e7.mongodb.net/${DB_NAME}`)
}

module.exports = connectDB
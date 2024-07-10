const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017/inotebook'

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => console.log("Mongo connected successfully"))
}

module.exports = connectToMongo
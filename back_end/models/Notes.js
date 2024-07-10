const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({
  // Adding a foregin key "user.id" to map user and notes
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title:  String, // String is shorthand for {type: String}
  author: String,
  description:   String,
  date: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model('notes', notesSchema)
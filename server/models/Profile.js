const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  nickname: {
    type: String,
  },
  age: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  characteristics: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },

  Info: [
    {
      contact: {
        type: String,
        required: true,
      },
      lister: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      notes: {
        type: String,
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);

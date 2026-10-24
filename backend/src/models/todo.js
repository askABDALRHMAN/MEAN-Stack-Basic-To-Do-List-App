const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Todo', todoSchema);

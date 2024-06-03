const mongoose = require('mongoose');

const recognitionSchema = new mongoose.Schema(
  {
    recognized_name: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'recognized_names', // Explicitly specify collection name
    timestamps: true // Add createdAt and updatedAt timestamps
  }
);

const Recognition = mongoose.model('Recognition', recognitionSchema);

module.exports = Recognition;

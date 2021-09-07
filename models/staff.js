const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    userId:{type: String},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Staff', staffSchema);

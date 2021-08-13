const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: mongoose.ObjectId, ref: 'Category' },
    location: { type: mongoose.ObjectId, ref: 'Location' }, // Location
    /* Added user here */
    assignedTo: { type: mongoose.ObjectId, ref: 'User' },
    serialNumber: { type: String, unique: true },
    assetID: { type: String, unique: true },
    model: { type: String },
    description: { type: String },
    condition: { type: String}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Asset', assetSchema);

const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: mongoose.ObjectId, ref: 'Category' },
    location: { type: mongoose.ObjectId, ref: 'Location' },
    serialNumber: { type: String, unique: true },
    model: { type: String },
    status: { type: Number, required: true},
    description: { type: String },
    condition: { type: String}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Asset', assetSchema);

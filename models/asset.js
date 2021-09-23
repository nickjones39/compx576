const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' }, // Location
    /* Added user here */ //
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    serialNumber: { type: String }, //  unique: true
    assetID: { type: String }, 
    model: { type: String },
    description: { type: String },
    condition: { type: String},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Asset', assetSchema);

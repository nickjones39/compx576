const Status = require('../models/status');
const Asset = require('../models/asset');

const defineSearchQuery = require('../utils/define-search-query');

exports.createStatus = async (req, res, next) => {
  try {
    const status = await new Status(req.body).save();
    res.status(200).json({ data: status });
  } catch (err) {
    next(err);
  }
};

exports.readStatus = async (req, res, next) => {
  try {
    const searchQuery = defineSearchQuery(req);
    const status = await Status.find(searchQuery).sort('name');
    res.status(200).json({ data: status });
  } catch (err) {
    next(err);
  }
};

exports.readStatus = async (req, res, next) => {
  try {
    const status = await Status.findById(req.params.id);
    if (!status) {
      return res.status(404).json({ error: 'Status not found' });
    }
    res.status(200).json({ data: status });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const status = await Status.findById(req.params.id);
    if (!status) {
      return res.status(404).json({ error: 'Status not found' });
    }
    await status.set(req.body).save();
    res.status(200).json({ data: status });
  } catch (err) {
    next(err);
  }
};

exports.deleteStatus = async (req, res, next) => {
  try {
    const loc = await Status.findById(req.params.id);
    if (!loc) {
      return res.status(404).json({ error: 'Status not found' });
    }
    const assets = await Asset.find({ status: loc._id });
    if (assets.length > 0) {
      return res
        .status(403)
        .json({ error: 'Forbidden: Status is used in Asset documents' });
    }
    const deleted = await loc.remove();
    res.status(200).json({ data: deleted });
  } catch (err) {
    next(err);
  }
};

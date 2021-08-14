const Asset = require('../models/asset');
const Category = require('../models/category');
const Location = require('../models/location');

const defineSearchQuery = require('../utils/define-search-query');
const calculatePaginationValues = require('../utils/calculate-pagination-values');

exports.createAsset = async (req, res, next) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const location = await Location.findById(req.body.location);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    const asset = await new Asset(req.body).save();
    res.status(200).json({ data: asset });
  } catch (err) {
    next(err);
  }
};

exports.readAssets = async (req, res, next) => {
  try {
    const populateQuery = [
      { path: 'category', select: ['name', 'description'] },
      { path: 'location', select: ['name', 'description'] },
    ];
    const searchQuery = defineSearchQuery(req);
    const pagination = calculatePaginationValues(req);
    const allAssetsCount = await Asset.estimatedDocumentCount();
    const filteredAssetsCount = searchQuery
      ? (await Asset.find(searchQuery)).length
      : allAssetsCount;
    const assets = await Asset.find(searchQuery)
      .skip(pagination.startIndex)
      .limit(pagination.limit)
      .populate(populateQuery)
      .sort('name');
    res.status(200).json({
      all: allAssetsCount,
      filtered: filteredAssetsCount,
      count: assets.length,
      page: pagination.page,
      limit: pagination.limit,
      previous: pagination.previous,
      next:
        pagination.nextPageIndex < filteredAssetsCount ? pagination.next : null,
      data: assets,
    });
  } catch (err) {
    next(err);
  }
};

exports.readAsset = async (req, res, next) => {
  try {
    const populateQuery = [
      { path: 'category', select: ['name', 'description'] },
      { path: 'location', select: ['name', 'description'] },
    ];
    const asset = await Asset.findById(req.params.id).populate(populateQuery);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.status(200).json({ data: asset });
  } catch (err) {
    next(err);
  }
};

exports.updateAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    await asset.set(req.body).save();
    res.status(200).json({ data: asset });
  } catch (err) {
    next(err);
  }
};

exports.deleteAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    const deleted = await asset.remove();
    res.status(200).json({ data: deleted });
  } catch (err) {
    next(err);
  }
};

const express = require('express');
const router = express.Router();

const assetsController = require('../controllers/assets');
const authorize = require('../middleware/authorize');

router.post('/', authorize, assetsController.createAsset);

router.get('/', assetsController.readAssets);

router.get('/:id', assetsController.readAsset);

router.patch('/:id', authorize, assetsController.updateAsset);

router.delete('/:id', authorize, assetsController.deleteAsset);

module.exports = router;

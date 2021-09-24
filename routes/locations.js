const express = require('express');
const router = express.Router();

const locationsController = require('../controllers/locations');
const authorize = require('../middleware/authorize');

router.post('/', authorize, locationsController.createLocation);

router.get('/', locationsController.readLocations);

router.get('/:id', locationsController.readLocation);

router.patch('/:id', authorize, locationsController.updateLocation);

router.delete('/:id', authorize, locationsController.deleteLocation);

module.exports = router;

const express = require('express');
const router = express.Router();

const statusesController = require('../controllers/statuses');
const authorize = require('../middleware/authorize');

router.post('/', authorize, statusesController.createStatus);

router.get('/', statusesController.readStatuses);

router.get('/:id', statusesController.readStatus);

router.patch('/:id', authorize, statusesController.updateStatus);

router.delete('/:id', authorize, statusesController.deleteStatus);

module.exports = router;

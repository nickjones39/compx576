const express = require('express');
const router = express.Router();

const statusController = require('../controllers/status');
const authorize = require('../middleware/authorize');

router.post('/', authorize, statusController.createStatus);

router.get('/', statusController.readStatus);

router.get('/:id', statusController.readStatus);

router.patch('/:id', authorize, statusController.updateStatus);

router.delete('/:id', authorize, statusController.deleteStatus);

module.exports = router;

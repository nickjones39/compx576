const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categories');
const authorize = require('../middleware/authorize');

router.post('/', authorize, categoriesController.createCategory);

router.get('/', categoriesController.readCategories);

router.get('/:id', categoriesController.readCategory);

router.patch('/:id', authorize, categoriesController.updateCategory);

router.delete('/:id', authorize, categoriesController.deleteCategory);

module.exports = router;

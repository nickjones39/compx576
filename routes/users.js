const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const adminonly = require('../middleware/adminonly');
const authorize = require('../middleware/authorize');

router.post('/', adminonly, usersController.createUser);  // adminonly,
router.post('/login', adminonly, usersController.loginUser);
router.get('/', adminonly, usersController.readUsers); // adminonly, 
router.get('/:id',  adminonly, usersController.readUser); // adminonly,
router.patch('/:id', adminonly, usersController.updateUser); // adminonly,
router.delete('/:id', adminonly, usersController.deleteUser); // adminonly,
router.patch(
  '/changeownpassword/:id',
  authorize,
  usersController.changeOwnPassword
);

module.exports = router;

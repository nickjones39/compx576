const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
// const adminonly = require('../middleware/adminonly');
// const authorize = require('../middleware/authorize');

router.post('/', usersController.createUser);  // adminonly,
router.post('/login', usersController.loginUser);
router.get('/', usersController.readUsers); // adminonly, 
router.get('/:id',  usersController.readUser); // adminonly,
router.patch('/:id', usersController.updateUser); // adminonly,
router.delete('/:id', usersController.deleteUser); // adminonly,
router.patch(
  '/changeownpassword/:id',
  authorize,
  usersController.changeOwnPassword
);

module.exports = router;

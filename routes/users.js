/* eslint-disable import/extensions */
const express = require('express');
const userController = require('../controllers/users');
const userValidate = require('../middleware/userValidation');
const { checkNotAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.get('/', userController.getUsers);

router.get('/register/', checkNotAuthenticated, (req, res) => {
  res.render('users/register.ejs', { title: 'Registration' });
});

router.post('/register/', userValidate('createUser'), userController.createUser);

router.get('/:id', userController.getUser);

router.delete('/:id', userController.deleteUser);

router.patch('/:id', userController.updateUser);

module.exports = router;

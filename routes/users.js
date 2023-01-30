/* eslint-disable import/extensions */
const express = require('express');
const userController = require('../controllers/users');
const userValidate = require('../middleware/userValidation');

const router = express.Router();

router.get('/', userController.getUsers);

router.post('/register/', userValidate('createUser'), userController.createUser);

router.get('/:id', userController.getUser);

router.delete('/:id', userController.deleteUser);

router.patch('/:id', userController.updateUser);

module.exports = router;

/* eslint-disable import/extensions */
const express = require('express');
const passport = require('passport');
const userController = require('../controllers/users');
// const { validateUser } = require('../middleware/userValidation');
// const { checkNotAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), userController.getUsers);

// router.get('/register/', checkNotAuthenticated, (req, res) => {
//   res.render('users/register.ejs', { title: 'Registration' });
// });

// router.post('/register/', validateUser('createUser'), userController.createUser);

router.get('/:id/', userController.getUser);

router.delete('/:id/', userController.deleteUser);

router.patch('/:id/', userController.updateUser);

module.exports = router;

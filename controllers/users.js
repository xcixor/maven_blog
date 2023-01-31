const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const userService = require('../services/userService');

let users = [];

const createUser = async (req, res) => {
  const errors = expressValidator.validationResult(req);
  if (!errors.isEmpty()) {
    res.render(
      'users/register.ejs',
      { title: 'Registration', errors: errors.array() }
    );
    return;
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userDetails = { ...req.body, password: hashedPassword };
    const { code, response } = await userService.addUser(userDetails);
    if (code === 409) {
      const errorMessage = [{ msg: `The account ${response.email} already exists!` }];
      res.render(
        'users/register.ejs',
        { title: 'Registration', errors: errorMessage }
      );
      return;
    }
    res.redirect('/auth/login/');
    return;
  } catch (error) {
    res.render(
      'users/register.ejs',
      { title: 'Registration', errors: error }
    );
  }
};

const getUsers = (req, res) => {
  User.find((err, dbUsers) => {
    if (err) {
      return res.send(err);
    }
    return res.send(dbUsers);
  });
};

const getUser = (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  res.send(foundUser);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== id);
  res.send(`User ${id} deleted.`);
};

const updateUser = (req, res) => {
  // find user
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);
  // implement logic for update
  res.send(`User ${foundUser.id} updated.`);
};

module.exports = {
  createUser, getUsers, getUser, deleteUser, updateUser
};

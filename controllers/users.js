const expressValidator = require('express-validator');
const User = require('../models/userModel');
const userService = require('../services/userService');

let users = [];

const createUser = async (req, res) => {
  const errors = expressValidator.validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send({ errors: errors.array() });
  }
  const { code, response } = await userService.addUser(req.body);
  return res.status(code).json(response);

  // res.status(201).send(req.body);
  // encrypt password
  // const { password } = req.body;
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

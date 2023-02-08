/* eslint-disable import/extensions */
const User = require('../models/userModel');
const { StatusCodes } = require('../utils/httpStatusCodes');

const addUser = async (details) => {
  const existingUser = await User.findOne({ email: details.email });
  if (existingUser) {
    return { code: StatusCodes.CONFLICT, response: existingUser };
  }
  const { _id, email } = await User.create(details);
  const response = { id: _id, email };
  return { code: StatusCodes.CREATED, response };
};

const getUsers = async () => {
  try {
    const users = await User.find({});
    return { code: StatusCodes.SUCCESS, users };
  } catch (error) {
    return { code: StatusCodes.INTERNAL_SERVER_ERROR, error };
  }
};

module.exports = { addUser, getUsers };

const { StatusCodes } = require('./httpStatusCodes');
const User = require('../models/userModel');

const getUserByEmail = async (email) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { code: StatusCodes.SUCCESS, response: existingUser };
  }
  return { code: StatusCodes.NOT_FOUND, response: null };
};

module.exports = getUserByEmail;

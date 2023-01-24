/* eslint-disable import/extensions */
const User = require('../models/userModel');
const { StatusCodes } = require('../utils/httpStatusCodes');

const addUser = async (details) => {
  const { _id } = await User.create(details);

  const response = { id: _id };

  return { code: StatusCodes.CREATED, response };
};

module.exports = { addUser };

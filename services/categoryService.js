const Category = require('../models/categoryModel');
const { StatusCodes } = require('../utils/httpStatusCodes');

const getCategories = () => {
  Category.find({}, (err, category) => {
    if (err) return { code: StatusCodes.INTERNAL_SERVER_ERROR, response: err };
    return { code: StatusCodes.OK, response: category };
  });
};

const addCategory = async (details) => {
  const existingCategory = await Category.findOne({ title: details.title });
  if (existingCategory) {
    return { code: StatusCodes.CONFLICT, response: existingCategory };
  }
  const { title } = await Category.create(details);
  const response = { title };
  return { code: StatusCodes.CREATED, response };
};

module.exports = { getCategories, addCategory };

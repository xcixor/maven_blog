const Category = require('../models/categoryModel');
const { StatusCodes } = require('../utils/httpStatusCodes');

const getCategories = async () => {
  try {
    const categories = await Category.find({});
    return { code: StatusCodes.SUCCESS, categories };
  } catch (error) {
    return { code: StatusCodes.INTERNAL_SERVER_ERROR, error };
  }
};

const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  return { code: StatusCodes.SUCCESS, category };
};

const addCategory = async (details) => {
  const existingCategory = await Category.findOne({ title: details.title });
  if (existingCategory) {
    return { code: StatusCodes.CONFLICT, response: existingCategory };
  }
  try {
    const { title } = await Category.create(details);
    const response = { title };
    return { code: StatusCodes.CREATED, response };
  } catch (error) {
    return { code: StatusCodes.INTERNAL_SERVER_ERROR, error };
  }
};

module.exports = { getCategories, addCategory, getCategoryById };

const expressValidator = require('express-validator');
const { addCategory, getCategoryById } = require('../services/categoryService');
const Category = require('../models/categoryModel');

const getCreateCategoryPage = (req, res) => {
  res.render(
    'categories/category.ejs',
    { title: 'Add Category' }
  );
};

const createCategory = async (req, res) => {
  const { code, response } = await addCategory(req.body);
  if (code === 409) {
    const errorMessage = [{ msg: `A category with the title ${response.title} already exists!` }];
    res.render(
      'categories/category.ejs',
      { title: 'Add category', errors: errorMessage }
    );
    return;
  }
  res.redirect('/categories/');
};

const getUpdateCategoryPage = async (req, res) => {
  const id = req.params.categoryId;
  const { category } = await getCategoryById(id);
  res.render(
    'categories/update.ejs',
    { title: 'Update Category', category }
  );
};

const updateCategory = async (req, res) => {
  const id = req.params.categoryId;
  const { category } = await getCategoryById(id);
  const errors = expressValidator.validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('error', 'Please correct the errors in the form.');
    res.render(
      'categories/update.ejs',
      { title: 'Update Category', errors: errors.array(), category }
    );
    return;
  }
  const updateObject = req.body;
  Category.updateOne({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      req.flash('success', `${req.body.title} updated successfuly`);
      res.redirect('/');
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error. Please try again. ${err}`
      });
    });
};

module.exports = {
  getCreateCategoryPage,
  createCategory,
  updateCategory,
  getUpdateCategoryPage
};

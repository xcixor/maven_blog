const express = require('express');
const { checkAuthenticated } = require('../middleware/auth');
const {
  getCreateCategoryPage,
  createCategory,
  updateCategory,
  getUpdateCategoryPage,
  deleteCategory
} = require('../controllers/categories');
const { validateCategory } = require('../middleware/categoryValidation');

const router = express.Router();

router.get('/', checkAuthenticated, getCreateCategoryPage);

router.post('/', checkAuthenticated, validateCategory(), createCategory);

router.get('/:categoryId/', checkAuthenticated, getUpdateCategoryPage);

router.patch('/:categoryId/', checkAuthenticated, validateCategory(), updateCategory);

router.delete('/:categoryId/', checkAuthenticated, deleteCategory);

module.exports = router;

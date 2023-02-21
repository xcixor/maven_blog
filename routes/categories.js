const express = require('express');
const { checkIsAdmin } = require('../middleware/auth');
const {
  getCreateCategoryPage,
  createCategory,
  updateCategory,
  getUpdateCategoryPage,
  deleteCategory
} = require('../controllers/categories');
const { validateCategory } = require('../middleware/categoryValidation');

const router = express.Router();

router.get('/', checkIsAdmin, getCreateCategoryPage);

router.post('/', checkIsAdmin, validateCategory(), createCategory);

router.get('/:categoryId/', checkIsAdmin, getUpdateCategoryPage);

router.patch('/:categoryId/', checkIsAdmin, validateCategory(), updateCategory);

router.delete('/:categoryId/', checkIsAdmin, deleteCategory);

module.exports = router;

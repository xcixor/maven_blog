const express = require('express');
const { checkAuthenticated } = require('../middleware/auth');
const {
  getCreateCategoryPage,
  createCategory,
  updateCategory,
  getUpdateCategoryPage
} = require('../controllers/categories');
const { validateCategory } = require('../middleware/categoryValidation');

const router = express.Router();

router.get('/', checkAuthenticated, getCreateCategoryPage);

router.post('/', checkAuthenticated, createCategory);

router.get('/:categoryId/', checkAuthenticated, getUpdateCategoryPage);

router.patch('/:categoryId/', validateCategory(), updateCategory);

module.exports = router;

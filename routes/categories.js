const express = require('express');
const { checkAuthenticated } = require('../middleware/auth');
const { getCreateCategoryPage, createCategory } = require('../controllers/categories');

const router = express.Router();

router.get('/', checkAuthenticated, getCreateCategoryPage);

router.post('/', checkAuthenticated, createCategory);

module.exports = router;

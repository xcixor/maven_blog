const express = require('express');
const { checkAuthenticated } = require('../middleware/auth');
const { getCreatePostPage, createPost } = require('../controllers/posts');

const router = express.Router();

router.get('/add/', checkAuthenticated, getCreatePostPage);

router.post('/', checkAuthenticated, createPost);

module.exports = router;

const express = require('express');
const { checkAuthenticated } = require('../middleware/auth');
const { getCreatePostPage, createPost, getPostsPage } = require('../controllers/posts');
const { validatePost } = require('../middleware/postValidation');

const router = express.Router();

router.get('/', checkAuthenticated, getPostsPage);

router.post('/', checkAuthenticated, validatePost(), createPost);

router.get('/add/', checkAuthenticated, getCreatePostPage);

module.exports = router;

const express = require('express');
const { checkAuthenticated } = require('../middleware/auth');
const {
  getCreatePostPage,
  createPost,
  getPostsPage,
  getUpdatePostPage,
  updatePost,
  deletePost
} = require('../controllers/posts');
const { validatePost } = require('../middleware/postValidation');

const router = express.Router();

router.get('/', checkAuthenticated, getPostsPage);

router.post('/', checkAuthenticated, validatePost(), createPost);

router.get('/add/', checkAuthenticated, getCreatePostPage);

router.get('/:postId/', checkAuthenticated, getUpdatePostPage);

router.patch('/:postId/', checkAuthenticated, validatePost(), updatePost);

router.delete('/:postId/', checkAuthenticated, deletePost);

module.exports = router;

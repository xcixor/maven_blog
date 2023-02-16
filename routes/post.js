const express = require('express');
const { checkAuthenticated } = require('../middleware/auth');
const {
  getCreatePostPage,
  createPost,
  getPostsPage,
  getUpdatePostPage,
  updatePost,
  deletePost,
  getPost
} = require('../controllers/posts');
const { validatePost } = require('../middleware/postValidation');

const router = express.Router();

router.get('/', checkAuthenticated, getPostsPage);

router.post('/', checkAuthenticated, validatePost(), createPost);

router.get('/add/', checkAuthenticated, getCreatePostPage);

router.get('/edit/:postId/', checkAuthenticated, getUpdatePostPage);

router.patch('/:postId/', checkAuthenticated, validatePost(), updatePost);

router.delete('/:postId/', checkAuthenticated, deletePost);

router.get('/:slug/', getPost);

module.exports = router;

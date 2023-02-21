const express = require('express');
const { checkIsAdmin } = require('../middleware/auth');
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

router.get('/', getPostsPage);

router.post('/', checkIsAdmin, validatePost(), createPost);

router.get('/add/', checkIsAdmin, getCreatePostPage);

router.get('/edit/:postId/', checkIsAdmin, getUpdatePostPage);

router.patch('/:postId/', checkIsAdmin, validatePost(), updatePost);

router.delete('/:postId/', checkIsAdmin, deletePost);

router.get('/:slug/', getPost);

module.exports = router;

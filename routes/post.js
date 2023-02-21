const express = require('express');
const passport = require('passport');
const { checkIsAdmin } = require('../middleware/auth');
const {
  getAllPosts,
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

router.get('/all/', passport.authenticate('jwt', { session: false }), getAllPosts);

router.post('/', checkIsAdmin, validatePost(), createPost);

router.get('/add/', checkIsAdmin, getCreatePostPage);

router.get('/edit/:postId/', checkIsAdmin, getUpdatePostPage);

router.patch('/:postId/', checkIsAdmin, validatePost(), updatePost);

router.delete('/:postId/', checkIsAdmin, deletePost);

router.get('/:slug/', getPost);

module.exports = router;

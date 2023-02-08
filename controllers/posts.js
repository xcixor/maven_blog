const expressValidator = require('express-validator');
const { convert } = require('html-to-text');
const { addPost, getPosts, getPostById } = require('../services/postService');
const { getCategories } = require('../services/categoryService');
const { StatusCodes } = require('../utils/httpStatusCodes');
const Post = require('../models/postModel');

const getPostsPage = async (req, res) => {
  const { posts } = await getPosts();
  res.render(
    'posts/posts.ejs',
    { title: 'Add Post', posts, convert }
  );
};

const getCreatePostPage = async (req, res) => {
  const { categories } = await getCategories();
  res.render(
    'posts/post.ejs',
    { title: 'Add Post', categories }
  );
};

const createPost = async (req, res) => {
  const errors = expressValidator.validationResult(req);
  const { categories } = await getCategories();
  if (!errors.isEmpty()) {
    req.flash('error', 'Please correct the errors in the form.');
    res.render(
      'posts/post.ejs',
      { title: 'Add Post', errors: errors.array(), categories }
    );
    return;
  }
  const details = { ...req.body, author: req.user.id };
  const { code, response } = await addPost(details);
  if (code === 409) {
    const errorMessage = [{ msg: `A post with the title ${response.title} already exists!` }];
    res.render(
      'posts/post.ejs',
      { title: 'Add Post', errors: errorMessage, categories }
    );
    return;
  }
  if (code === StatusCodes.INTERNAL_SERVER_ERROR) {
    const serverErrors = [{ msg: response }];
    req.flash('error', 'Oops, something went wrong, please check the errors below');
    res.render(
      'posts/post.ejs',
      { title: 'Add Post', serverErrors, categories }
    );
    return;
  }
  res.redirect('/posts/');
};

const getUpdatePostPage = async (req, res) => {
  const id = req.params.postId;
  const { post } = await getPostById(id);
  const { categories } = await getCategories();
  res.render(
    'posts/update.ejs',
    { title: 'Update Post', post, categories }
  );
};

const updatePost = async (req, res) => {
  const { categories } = await getCategories();
  const id = req.params.postId;
  const { post } = await getPostById(id);
  const errors = expressValidator.validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('error', 'Please correct the errors in the form.');
    res.render(
      'posts/update.ejs',
      {
        title: 'Update Post',
        post,
        categories,
        errors: errors.array()
      }
    );
    return;
  }
  const updateObject = req.body;
  Post.updateOne({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      req.flash('success', `${req.body.title} updated successfuly`);
      res.redirect('/posts/');
    })
    .catch((err) => {
      req.flash('error', `Server error. Please try again. ${err}`);
      res.redirect('/posts/');
    });
};

module.exports = {
  getCreatePostPage,
  createPost,
  getPostsPage,
  getUpdatePostPage,
  updatePost
};
